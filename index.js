import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: "dhekmzldg",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary vendors.json path
const vendorsFilePublicId = "vendors/vendors";
const vendorsFileUrl =
  "https://res.cloudinary.com/dhekmzldg/raw/upload/v1755588070/vendors/vendors.json";

// --- helper: fetch vendors.json from cloudinary ---
async function fetchVendors() {
  try {
    const res = await fetch(vendorsFileUrl);
    if (!res.ok) throw new Error("Cannot fetch vendors.json");
    return await res.json();
  } catch (err) {
    return {};
  }
}

// --- helper: save vendors.json back to cloudinary ---
async function saveVendors(vendors) {
  const uploadStr = JSON.stringify(vendors, null, 2);
  const base64 = Buffer.from(uploadStr).toString("base64");

  await cloudinary.uploader.upload(
    "data:application/json;base64," + base64,
    {
      resource_type: "raw",
      public_id: vendorsFilePublicId,
      overwrite: true,
      format: "json",
    }
  );
}

// --- route: upload vendor ---
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, location, type, uploaderId } = req.body;
    if (!req.file || !name || !location || !type || !uploaderId) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        folder: "vendors/images",
        resource_type: "image",
      },
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.json({ success: false, error: "Image upload failed" });
        }

        const [lat, lng] = location.split(",").map(Number);

        // fetch old vendors.json
        const vendors = await fetchVendors();

        vendors[name] = {
          lat,
          lng,
          categories: [type],
          image: result.secure_url,
          uploaderId,
        };

        // save back to Cloudinary
        await saveVendors(vendors);

        res.json({ success: true, vendor: vendors[name] });
      }
    );

    // write the file buffer into the stream
    uploadResult.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// --- route: get recent vendors for uploader ---
app.get("/recent/:uploaderId", async (req, res) => {
  try {
    const vendors = await fetchVendors();
    const entries = Object.entries(vendors)
      .filter(([_, v]) => v.uploaderId === req.params.uploaderId)
      .slice(-5) // last 5
      .map(([key, val]) => ({ name: key, ...val }));
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
