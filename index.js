import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ==================== CONFIG ====================
const SHOPIFY_STORE = "adsaurf.myshopify.com"; // Your Shopify store
const SHOPIFY_API_VERSION = "2025-01";
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN; // Admin API token with write_products scope
const VENDORS_API = "https://adsaurf-production.up.railway.app/vendors"; // Railway vendors endpoint
// =================================================

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Shopify Collection + Vendors API running...");
});

// Create Custom Collection + Update Vendors
app.post("/create-collection", async (req, res) => {
  const { name, image, template, vendor, lat, lng } = req.body;

  if (!name || !template || !vendor || !lat || !lng) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // -------------------
    // 1️⃣ Create Shopify Custom Collection
    // -------------------
    const payload = {
      custom_collection: {
        title: name,
        published: true,
        template_suffix: template, // e.g., "Grocery"
        image: image ? { src: image } : undefined,
      },
    };

    const shopifyResponse = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/custom_collections.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify(payload),
      }
    );

    const shopifyData = await shopifyResponse.json();
    console.log("🔎 Shopify raw response:", shopifyData);

    if (!shopifyResponse.ok || shopifyData.errors) {
      return res.status(400).json({
        success: false,
        shopifyStatus: shopifyResponse.status,
        shopifyStatusText: shopifyResponse.statusText,
        shopifyError: shopifyData.errors || "Unknown error",
      });
    }

    const collectionId = shopifyData?.custom_collection?.id || null;

    // -------------------
    // 2️⃣ Update Vendors on Railway
    // -------------------
    const vendorsPayload = {
      vendor: vendor,
      collectionId,
      name,
      template,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    const vendorsResponse = await fetch(VENDORS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorsPayload),
    });

    const vendorsData = await vendorsResponse.json();
    console.log("✅ Vendors updated:", vendorsData);

    // -------------------
    // 3️⃣ Final Response
    // -------------------
    res.json({
      success: true,
      message: "Collection created and vendor updated successfully",
      shopify: shopifyData.custom_collection,
      vendors: vendorsData,
    });
  } catch (err) {
    console.error("❌ Error creating collection or updating vendors:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
