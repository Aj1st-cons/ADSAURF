import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Vendors file path
const vendorsFile = path.join(process.cwd(), "let-vendors.js");

// Ensure file exists
if (!fs.existsSync(vendorsFile)) {
  fs.writeFileSync(vendorsFile, "let vendors = {};\nexport default vendors;");
}

// Helper: load vendors
function loadVendors() {
  delete require.cache[require.resolve("./let-vendors.js")];
  return require("./let-vendors.js").default || {};
}

// Helper: save vendors
function saveVendors(vendors) {
  const content = `let vendors = ${JSON.stringify(vendors, null, 2)};\nexport default vendors;`;
  fs.writeFileSync(vendorsFile, content);
}

// Endpoint: Get vendors
app.get("/vendors", (req, res) => {
  try {
    const vendors = loadVendors();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: Add vendor
app.post("/vendors", (req, res) => {
  try {
    const { name, lat, lng, categories, image, uploaderId } = req.body;
    if (!name || !lat || !lng || !categories || !image || !uploaderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const vendors = loadVendors();
    vendors[name] = { lat, lng, categories, image, uploaderId };
    saveVendors(vendors);

    res.json({ success: true, vendor: vendors[name] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
