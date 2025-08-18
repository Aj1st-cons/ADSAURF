import express from "express";
import fetch from "node-fetch";
import multer from "multer";

const app = express();
const upload = multer();
app.use(express.json());

// Cloudinary details
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dhekmzldg/raw/upload";
const CLOUDINARY_UPLOAD_PRESET = "vendors_preset"; // 👈 must be created in Cloudinary
const VENDORS_FILE_PUBLIC_ID = "vendors"; // file name on Cloudinary

// Cloudinary vendors.json URL
const CLOUDINARY_JSON_URL = "https://res.cloudinary.com/dhekmzldg/raw/upload/vendors.json";

// Add new vendor
app.post("/add-vendor", upload.none(), async (req, res) => {
  try {
    const { name, lat, lng, categories, image, uploaderId } = req.body;

    // 1. Fetch existing vendors.json from Cloudinary
    let vendors = {};
    try {
      const response = await fetch(CLOUDINARY_JSON_URL);
      vendors = await response.json();
    } catch (err) {
      console.log("No existing vendors.json found. Creating new.");
      vendors = {};
    }

    // 2. Add new vendor
    vendors[name] = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      categories: categories ? categories.split(",") : [],
      image,
      uploaderId,
    };

    // 3. Upload updated vendors.json back to Cloudinary (overwrite existing file)
    const uploadRes = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: new URLSearchParams({
        file: JSON.stringify(vendors),
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
        public_id: VENDORS_FILE_PUBLIC_ID,
        overwrite: "true"
      })
    });

    const cloudinaryData = await uploadRes.json();
    res.json({ success: true, url: cloudinaryData.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend running on port 3000");
});
