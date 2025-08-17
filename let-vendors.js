import express from "express";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const VENDORS_ENDPOINT = "https://adsaurf-production.up.railway.app/vendors";
const OUTPUT_FILE = path.join(process.cwd(), "vendors-data.js"); // this is what visitors will download

// Function to fetch vendors and update JS file
async function updateVendorsFile() {
  try {
    const res = await fetch(VENDORS_ENDPOINT);
    const data = await res.json();

    // Format vendors without image/uploaderId
    const lines = ["let vendors = {"];
    const names = Object.keys(data);
    names.forEach((name, index) => {
      const v = data[name];
      const categoriesStr = `[${v.categories.map(c => `"${c}"`).join(", ")}]`;
      const comma = index < names.length - 1 ? "," : "";
      lines.push(`  "${name}": { lat: ${v.lat}, lng: ${v.lng}, categories: ${categoriesStr} }${comma}`);
    });
    lines.push("};");
    lines.push("export default vendors;");

    fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");
    console.log(`[${new Date().toISOString()}] vendors-data.js updated`);
  } catch (err) {
    console.error("Error updating vendors file:", err.message);
  }
}

// Initial update
updateVendorsFile();

// Update every 10 minutes
setInterval(updateVendorsFile, 10 * 60 * 1000);

// Serve the file to visitors
app.get("/let-vendors.js", (req, res) => {
  if (fs.existsSync(OUTPUT_FILE)) {
    res.setHeader("Content-Type", "application/javascript");
    res.sendFile(OUTPUT_FILE);
  } else {
    res.status(503).send("// Vendors file not ready yet");
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
