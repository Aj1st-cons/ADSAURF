import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(bodyParser.json());

cloudinary.config({
  secure: true
});

// Cloudinary file details
const VENDORS_FILE = "vendors/vendors.json";
const UPLOAD_PRESET = "vendors";

// Helper: fetch vendors.json from Cloudinary
async function fetchVendors() {
  try {
    const url = cloudinary.url(VENDORS_FILE, { resource_type: "raw", secure: true });
    const res = await fetch(url);
    if (!res.ok) return {};
    return await res.json();
  } catch (e) {
    return {};
  }
}

// Helper: upload new vendors.json
async function saveVendors(vendors) {
  const uploadStr = JSON.stringify(vendors, null, 2);
  await cloudinary.uploader.upload_stream({
    resource_type: "raw",
    public_id: "vendors/vendors",
    overwrite: true,
    format: "json"
  }).end(uploadStr);
}

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, location, type, uploaderId } = req.body;
    const [lat, lng] = location.split(",").map(Number);

    // upload image to cloudinary
    const imgRes = await cloudinary.uploader.upload_stream({
      folder: "vendors",
      upload_preset: UPLOAD_PRESET
    });

    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "vendors" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        });
      stream.end(req.file.buffer);
    });

    // update vendors.json
    let vendors = await fetchVendors();
    vendors[name] = { lat, lng, categories: [type], image: imageUrl, uploaderId };

    await saveVendors(vendors);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

app.get("/recent/:uploaderId", async (req, res) => {
  const vendors = await fetchVendors();
  const list = Object.entries(vendors)
    .filter(([_, v]) => v.uploaderId === req.params.uploaderId)
    .slice(-5)
    .reverse()
    .map(([name, v]) => ({ name, ...v }));
  res.json(list);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("🚀 Backend running on " + port));
