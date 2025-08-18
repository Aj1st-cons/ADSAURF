import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import multer from "multer";

const app = express();
app.use(express.json({ limit: "10mb" }));

// Multer setup to handle image uploads from HTML form
const upload = multer();

// Cloudinary settings
const CLOUD_NAME = "dhekmzldg";
const IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const RAW_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;
const UPLOAD_PRESET = "vendors_preset"; // unsigned preset
const VENDORS_FILE_PUBLIC_ID = "vendors"; // vendors.json public ID
const CLOUDINARY_JSON_URL = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${VENDORS_FILE_PUBLIC_ID}.json`;

// GET vendors
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

// POST add vendor (image + data)
app.post("/add-vendor", upload.single("imageFile"), async (req, res) => {
  try {
    const { name, lat, lng, categories, uploaderId } = req.body;
    const file = req.file;

    if (!name || !lat || !lng || !categories || !uploaderId || !file) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Upload image to Cloudinary
    const imgForm = new FormData();
    imgForm.append("file", file.buffer, { filename: file.originalname });
    imgForm.append("upload_preset", UPLOAD_PRESET);

    const imgRes = await fetch(IMAGE_UPLOAD_URL, { method: "POST", body: imgForm });
    const imgJson = await imgRes.json();
    if (!imgJson.secure_url) throw new Error("Image upload failed");
    const imageUrl = imgJson.secure_url;

    // 2. Fetch existing vendors.json
    let vendors = {};
    try {
      const response = await fetch(CLOUDINARY_JSON_URL);
      vendors = await response.json();
    } catch {
      vendors = {};
    }

    // 3. Merge new vendor
    vendors[name] = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      categories: Array.isArray(categories) ? categories : categories.split(","),
      image: imageUrl,
      uploaderId
    };

    // 4. Upload updated vendors.json to Cloudinary
    const jsonForm = new FormData();
    jsonForm.append("file", JSON.stringify(vendors));
    jsonForm.append("upload_preset", UPLOAD_PRESET);
    jsonForm.append("public_id", VENDORS_FILE_PUBLIC_ID);
    jsonForm.append("overwrite", "true");

    const jsonRes = await fetch(RAW_UPLOAD_URL, { method: "POST", body: jsonForm });
    const jsonData = await jsonRes.json();
    if (!jsonData.secure_url) throw new Error("Failed to upload vendors.json");

    res.json({ success: true, url: jsonData.secure_url, vendors });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
