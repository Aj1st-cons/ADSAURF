import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ==================== CONFIG ====================
const SHOPIFY_STORE = "adsaurf.myshopify.com"; // replace with your store
const SHOPIFY_ADMIN_API_VERSION = "2025-01";   // update if newer
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN; // set in Railway
// =================================================

// ✅ Endpoint to create collection in Shopify + update vendors
app.post("/create-collection", async (req, res) => {
  const { name, imageBase64, template, vendor } = req.body;

  if (!name || !template) {
    return res.status(400).json({ error: "Name and template are required" });
  }

  try {
    // -------------------
    // 1️⃣ Create collection in Shopify
    // -------------------
    const shopifyPayload = {
      custom_collection: {
        title: name,
        template_suffix: template, // e.g. "Grocery"
        published: true,
        image: imageBase64
          ? {
              attachment: imageBase64, // expects base64 without "data:image/png;base64,"
            }
          : undefined,
      },
    };

    const shopifyResponse = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/custom_collections.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopifyPayload),
      }
    );

    const shopifyData = await shopifyResponse.json();
    console.log("🔎 Shopify raw response:", JSON.stringify(shopifyData));

    if (!shopifyResponse.ok) {
      return res.status(shopifyResponse.status).json({
        error: "Failed to create collection in Shopify",
        details: shopifyData,
      });
    }

    const collectionId = shopifyData?.custom_collection?.id || null;

    // -------------------
    // 2️⃣ Update Railway /vendors
    // -------------------
    const vendorsResponse = await fetch(
      "https://adsaurf-production.up.railway.app/vendors",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor: vendor || name,
          collectionId,
          template,
        }),
      }
    );

    const vendorsData = await vendorsResponse.json();
    console.log("✅ Vendors updated:", vendorsData);

    // -------------------
    // Final Response
    // -------------------
    res.json({
      message: "Collection created and vendor updated successfully",
      shopify: shopifyData,
      vendors: vendorsData,
    });
  } catch (err) {
    console.error("❌ Error in create-collection:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Default health check
app.get("/", (req, res) => {
  res.send("🚀 Shopify Collection API running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
