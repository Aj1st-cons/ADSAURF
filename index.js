const express = require("express");
const fetch = require("node-fetch"); // make sure node-fetch@2
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup
const upload = multer({ dest: UPLOAD_DIR });

// Shopify API (smart collections)
const SHOPIFY_API =
  "https://nearbys.online/admin/api/2025-01/smart_collections.json";
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

// Vendors memory
let vendors = {};
try {
  vendors = require("./let-vendors.js").vendors;
} catch (err) {
  console.warn("⚠️ No vendors file found, starting empty.");
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

// Create Shopify smart collection + update vendors
app.post("/create-collection", upload.single("image"), async (req, res) => {
  try {
    const { storeName, storeType, lat, lng } = req.body;
    const imageFile = req.file;

    if (!storeName || !storeType || !lat || !lng || !imageFile) {
      return res.status(400).json({
        error: "❌ Missing storeName, storeType, lat, lng, or image",
        body: req.body,
      });
    }

    // Read image as Base64
    const imgBase64 = fs.readFileSync(imageFile.path, "base64");

    // Create Shopify smart collection
    const collectionRes = await fetch(SHOPIFY_API, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        smart_collection: {
          title: storeName,
          rules: [
            {
              column: "tag",
              relation: "equals",
              condition: storeType, // e.g., Grocery, Restaurant
            },
          ],
          published: true,
          image: { attachment: imgBase64 },
        },
      }),
    });

    const collectionText = await collectionRes.text();
    console.log("🔎 Shopify raw response:", collectionText);

    let collectionData;
    try {
      collectionData = JSON.parse(collectionText);
    } catch {
      collectionData = { raw: collectionText };
    }

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
      path.join(__dirname, "let-vendors.js"),
      `exports.vendors = ${JSON.stringify(vendors, null, 2)};`
    );

    res.json({
      message: "✅ Smart collection created & vendor updated",
      collection: collectionData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating collection" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
