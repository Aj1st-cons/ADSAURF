import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const VENDORS_FILE = path.join(process.cwd(), "let-vendors.js");

// Helper: read existing vendors
function readVendors() {
  try {
    if (!fs.existsSync(VENDORS_FILE)) return {};
    const content = fs.readFileSync(VENDORS_FILE, "utf-8");
    // Strip "let vendors = " and parse JSON
    const jsonStr = content.replace(/^let vendors\s*=\s*/, "").replace(/;$/, "");
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Failed to read vendors:", err);
    return {};
  }
}

// Helper: write vendors back
function writeVendors(vendors) {
  const data = "let vendors = " + JSON.stringify(vendors, null, 2) + ";";
  fs.writeFileSync(VENDORS_FILE, data, "utf-8");
}

// Endpoint to get all vendors
app.get("/vendors", (req, res) => {
  const vendors = readVendors();
  res.json(vendors);
});

// Endpoint to add a vendor
app.post("/vendors", async (req, res) => {
  const { name, lat, lng, categories, imageBase64, uploaderId } = req.body;

  if (!name || !lat || !lng || !categories || !imageBase64 || !uploaderId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Upload image to Cloudinary using unsigned preset
    const cloudName = "dhekmzldg";
    const uploadPreset = "Vendors";

    const formData = new URLSearchParams();
    formData.append("file", "data:image/jpeg;base64," + imageBase64);
    formData.append("upload_preset", uploadPreset);

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const cloudData = await cloudRes.json();
    if (!cloudData.secure_url) throw new Error("Cloudinary upload failed");

    const vendors = readVendors();

    vendors[name] = {
      lat: Number(lat),
      lng: Number(lng),
      categories,
      image: cloudData.secure_url,
      uploaderId
    };

    writeVendors(vendors);

    res.json({ success: true, vendor: vendors[name] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
