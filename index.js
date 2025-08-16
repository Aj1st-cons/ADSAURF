import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());

// Multer for handling file uploads
const upload = multer();

// ⚠️ Store your token in Railway environment variable
const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN;
const SHOPIFY_STORE = "nearbys.online"; // your Shopify domain

// Endpoint to create collection with uploaded image
app.post("/create-collection", upload.single("image"), async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!name || !file) return res.status(400).json({ error: "Name and image file are required" });

  try {
    // Upload image to Shopify Files API
    const formData = new FormData();
    formData.append("file", file.buffer, { filename: file.originalname });

    const uploadRes = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-01/files.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_API_TOKEN
      },
      body: JSON.stringify({
        file: {
          attachment: file.buffer.toString("base64"),
          filename: file.originalname
        }
      })
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) return res.status(uploadRes.status).json({ error: uploadData.errors });

    const imageUrl = uploadData.file.src;

    // Create collection with uploaded image URL
    const collRes = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-01/custom_collections.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_API_TOKEN
      },
      body: JSON.stringify({
        custom_collection: { title: name, image: { src: imageUrl } }
      })
    });

    const collData = await collRes.json();

    if (!collRes.ok) return res.status(collRes.status).json({ error: collData.errors });

    res.json({ success: true, collection: collData.custom_collection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
