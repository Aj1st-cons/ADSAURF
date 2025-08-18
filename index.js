import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const CLOUDINARY_CLOUD_NAME = "dhekmzldg";
const CLOUDINARY_UPLOAD_PRESET = "Vendors"; // make sure this preset allows raw uploads
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// URL for vendors.json
const VENDORS_FILE_PUBLIC_ID = "vendors.json"; 

// Load vendors.json from Cloudinary
async function loadVendors() {
  const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/${VENDORS_FILE_PUBLIC_ID}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Vendors file not found");
    return await res.json();
  } catch (err) {
    return {}; // if no vendors.json yet
  }
}

// Save vendors.json to Cloudinary
async function saveVendors(vendors) {
  const form = new FormData();
  form.append("file", JSON.stringify(vendors));
  form.append("public_id", "vendors"); // will become vendors.json
  form.append("resource_type", "raw");
  form.append("overwrite", "true");
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
    method: "POST",
    body: form
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error(data.error?.message || "Cloudinary upload failed");
  return data.secure_url;
}

// Get vendors
app.get("/vendors", async (req, res) => {
  const vendors = await loadVendors();
  res.json(vendors);
});

// Save single vendor (adds/updates)
app.post("/vendors", async (req, res) => {
  const { name, lat, lng, categories, uploaderId, imageBase64 } = req.body;
  if (!name || lat == null || lng == null || !categories || !uploaderId || !imageBase64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Upload vendor image
  const form = new FormData();
  form.append("file", `data:image/png;base64,${imageBase64}`);
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form
  });

  const cloudData = await cloudRes.json();
  if (!cloudData.secure_url) {
    return res.status(500).json({ error: cloudData.error?.message || "Cloudinary image upload failed" });
  }

  // Update vendors.json
  const vendors = await loadVendors();
  vendors[name] = { lat, lng, categories, image: cloudData.secure_url, uploaderId };
  await saveVendors(vendors);

  res.json({ success: true, vendor: vendors[name] });
});

// Bulk update vendors
app.post("/vendors-bulk", async (req, res) => {
  try {
    const { vendors } = req.body;
    if (!vendors || typeof vendors !== "object") {
      return res.status(400).json({ error: "Invalid vendors data" });
    }
    await saveVendors(vendors);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
