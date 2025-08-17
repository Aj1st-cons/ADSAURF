import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vendorsFile = path.join(__dirname, "let-vendors.js");

// Ensure file exists
if (!fs.existsSync(vendorsFile)) {
  fs.writeFileSync(vendorsFile, "let vendors = {};\nexport default vendors;");
}

// Helper: load vendors dynamically
async function loadVendors() {
  const vendorsModule = await import(vendorsFile + "?update=" + Date.now());
  return vendorsModule.default || {};
}

// Helper: save vendors
function saveVendors(vendors) {
  const content = `let vendors = ${JSON.stringify(vendors, null, 2)};\nexport default vendors;`;
  fs.writeFileSync(vendorsFile, content);
}

// Endpoint: Get vendors
app.get("/vendors", async (req, res) => {
  try {
    const vendors = await loadVendors();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: Add vendor
app.post("/vendors", async (req, res) => {
  try {
    const { name, lat, lng, categories, image, uploaderId } = req.body;
    if (!name || !lat || !lng || !categories || !image || !uploaderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const vendors = await loadVendors();
    vendors[name] = { lat, lng, categories, image, uploaderId };
    saveVendors(vendors);

    res.json({ success: true, vendor: vendors[name] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
