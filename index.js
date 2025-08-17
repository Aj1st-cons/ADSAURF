import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vendorsFile = path.join(__dirname, "let-vendors.js");

const CLOUDINARY_CLOUD_NAME = "dhekmzldg";

// Ensure vendors file exists
if (!fs.existsSync(vendorsFile)) {
  fs.writeFileSync(vendorsFile, "let vendors = {};\nexport default vendors;");
}

async function loadVendors() {
  const vendorsModule = await import(vendorsFile + "?update=" + Date.now());
  return vendorsModule.default || {};
}

function saveVendors(vendors) {
  // Save all required fields: lat, lng, categories, image, uploaderId
  const content = `let vendors = ${JSON.stringify(vendors, null, 2)};\nexport default vendors;`;
  fs.writeFileSync(vendorsFile, content);
}

app.get("/vendors", async (req, res) => {
  try {
    const vendors = await loadVendors();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/vendors", async (req, res) => {
  try {
    const { name, lat, lng, categories, uploaderId, imageBase64 } = req.body;
    if (!name || !lat || !lng || !categories || !uploaderId || !imageBase64) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload image to Cloudinary
    const form = new FormData();
    form.append("file", `data:image/png;base64,${imageBase64}`);
    form.append("upload_preset", "Vendors");

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: form
    });

    const cloudData = await cloudRes.json();
    if (!cloudData.secure_url) {
      return res.status(500).json({ error: cloudData.error?.message || "Cloudinary upload failed" });
    }

    const imageUrl = cloudData.secure_url;

    const vendors = await loadVendors();
    vendors[name] = { lat, lng, categories, image: imageUrl, uploaderId };
    saveVendors(vendors);

    res.json({ success: true, vendor: vendors[name] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
