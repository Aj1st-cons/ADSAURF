import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Keep sensitive data in Railway Environment Variables
const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN || "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";
const SHOPIFY_STORE = "nearbys.online"; // your domain

// ✅ Create Collection Endpoint
app.post("/create-collection", async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: "Name and image URL are required" });
  }

  try {
    const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-01/custom_collections.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_API_TOKEN
      },
      body: JSON.stringify({
        custom_collection: {
          title: name,
          image: { src: image }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors || "Failed to create collection" });
    }

    res.json({ success: true, collection: data.custom_collection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
