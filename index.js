import express from "express";
import fetch from "node-fetch";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Shopify API
const SHOPIFY_API =
  "https://nearbys.online/admin/api/2025-01/custom_collections.json";
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

// Vendors memory
let vendors = {};
try {
  const mod = await import("./let-vendors.js");
  vendors = mod.vendors;
} catch (err) {
  console.warn("⚠️ No vendors file found, starting with empty vendors.");
  vendors = {};
}

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Return vendors JSON
app.get("/vendors", (req, res) => {
  res.json(vendors);
});

// Create Shopify collection + update vendors
app.post(
  "/create-collection",
  upload.single("image"),
  async (req, res) => {
    try {
      const { storeName, storeType, lat, lng } = req.body;
      const imageFile = req.file;

      if (!storeName || !storeType || !lat || !lng || !imageFile) {
        return res.status(400).json({
          error: "❌ Missing storeName, storeType, lat, lng, or image",
          body: req.body,
        });
      }

      // Read image
      const imgBase64 = fs.readFileSync(imageFile.path, "base64");

      // Create Shopify collection
      const collectionRes = await fetch(SHOPIFY_API, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          custom_collection: {
            title: storeName,
            template_suffix: storeType, // only suffix (e.g. "Grocery")
            image: { attachment: imgBase64 },
          },
        }),
      });

      const collectionData = await collectionRes.json();

      if (collectionData.errors) {
        console.error("❌ Shopify error:", collectionData.errors);
        return res.status(400).json({ error: collectionData.errors });
      }

      // Update vendors
      vendors[storeName] = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        categories: [storeType],
      };

      // Save vendors back to file
      fs.writeFileSync(
        "./let-vendors.js",
        `export let vendors = ${JSON.stringify(vendors, null, 2)};`
      );

      res.json({
        message: "✅ Collection created & vendor updated",
        collection: collectionData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating collection" });
    }
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
