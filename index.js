import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(bodyParser.json());

// ✅ Cloudinary config from Railway env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// File location in Cloudinary
const VENDORS_FILE = "vendors/vendors.json";

// --- Helpers ---

// Fetch vendors.json from Cloudinary
async function fetchVendors() {
  try {
    const url = cloudinary.url("vendors/vendors.json", {
      resource_type: "raw",
      secure: true
    });
    const res = await fetch(url);
    if (!res.ok) return {}; // If file doesn’t exist yet
    return await res.json();
  } catch (e) {
    console.error("Fetch vendors.json failed:", e.message);
    return {};
  }
}

// Save vendors.json back to Cloudinary
async function saveVendors(vendors) {
  const uploadStr = JSON.stringify(vendors, null, 2);
  await cloudinary.uploader.upload(
    "data:application/json;base64," +
      Buffer.from(uploadStr).toString("base64"),
    {
      resource_type: "raw",
      public_id: "vendors/vendors", // saved as vendors/vendors.json
      overwrite: true,
      format: "json"
    }
  );
}

// --- Routes ---

// Upload new store
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, location, type, uploaderId } = req.body;
    const [lat, lng] = location.split(",").map(Number);

    // Upload image to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "vendors" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(req.file.buffer);
    });

    // Fetch + update vendors.json
    let vendors = await fetchVendors();
    vendors[name] = { lat, lng, categories: [type], image: imageUrl, uploaderId };

    await saveVendors(vendors);

    res.json({ success: true });
  } catch (err) {
    console.error("Upload failed:", err.message);
    res.json({ success: false, error: err.message });
  }
});

// Recent uploads for one uploader
app.get("/recent/:uploaderId", async (req, res) => {
  const vendors = await fetchVendors();
  const list = Object.entries(vendors)
    .filter(([_, v]) => v.uploaderId === req.params.uploaderId)
    .slice(-5)
    .reverse()
    .map(([name, v]) => ({ name, ...v }));
  res.json(list);
});

// --- Start server ---
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("🚀 Backend running on port " + port));
