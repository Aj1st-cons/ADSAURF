import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
app.use(express.json({ limit: "10mb" }));

// Cloudinary settings
const CLOUD_NAME = "dhekmzldg";
const RAW_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;
const IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = "vendors_preset"; // unsigned preset for images
const VENDORS_FILE_PUBLIC_ID = "vendors"; // vendors.json public ID

// Cloudinary vendors.json URL (always latest version)
const CLOUDINARY_JSON_URL = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${VENDORS_FILE_PUBLIC_ID}.json`;

// GET: fetch current vendors
app.get("/vendors", async (req, res) => {
  try {
    const response = await fetch(CLOUDINARY_JSON_URL);
    const vendors = await response.json();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch vendors.json" });
  }
});

// POST: add new vendor
app.post("/add-vendor", async (req, res) => {
  try {
    const { name, lat, lng, categories, image, uploaderId } = req.body;

    if (!name || !lat || !lng || !categories || !image || !uploaderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Fetch existing vendors.json
    let vendors = {};
    try {
      const response = await fetch(CLOUDINARY_JSON_URL);
      vendors = await response.json();
    } catch {
      console.log("No existing vendors.json found. Creating new.");
      vendors = {};
    }

    // 2. Add/merge new vendor
    vendors[name] = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      categories: Array.isArray(categories) ? categories : categories.split(","),
      image,
      uploaderId
    };

    // 3. Upload updated vendors.json to Cloudinary (overwrite)
    const form = new FormData();
    form.append("file", JSON.stringify(vendors));
    form.append("upload_preset", UPLOAD_PRESET); // must be unsigned preset
    form.append("public_id", VENDORS_FILE_PUBLIC_ID);
    form.append("overwrite", "true");

    const uploadRes = await fetch(RAW_UPLOAD_URL, {
      method: "POST",
      body: form
    });

    const cloudData = await uploadRes.json();
    if (!cloudData.secure_url) {
      return res.status(500).json({ error: "Failed to upload vendors.json to Cloudinary" });
    }

    res.json({ success: true, url: cloudData.secure_url, vendors });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
