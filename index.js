import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import cors from "cors";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configure Cloudinary from CLOUDINARY_URL env var
cloudinary.v2.config({
  secure: true
});

// URL of your vendors.json file in Cloudinary
const VENDORS_URL = "https://res.cloudinary.com/dhekmzldg/raw/upload/v1755544848/vendors_bmkuev.json";

// --- Upload new store ---
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, lat, lng, category, uploaderId } = req.body;

    if (!name || !lat || !lng || !category || !uploaderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Upload image to Cloudinary
    const imageResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: "vendors", resource_type: "image" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = imageResult.secure_url;

    // 2. Fetch existing vendors.json
    const response = await fetch(VENDORS_URL);
    const vendors = await response.json();

    // 3. Add new vendor
    vendors[name] = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      categories: [category],
      image: imageUrl,
      uploaderId
    };

    // 4. Re-upload updated JSON to Cloudinary
    await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "vendors",
          public_id: "vendors_bmkuev",
          resource_type: "raw",
          overwrite: true,
          format: "json"
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(Buffer.from(JSON.stringify(vendors, null, 2)));
    });

    res.json({ success: true, vendor: vendors[name] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Fetch last 5 uploaded stores for a user ---
app.get("/recent/:uploaderId", async (req, res) => {
  try {
    const response = await fetch(VENDORS_URL);
    const vendors = await response.json();
    const uploaderId = req.params.uploaderId;

    const recent = Object.entries(vendors)
      .filter(([_, v]) => v.uploaderId === uploaderId)
      .slice(-5)
      .reverse()
      .map(([name, v]) => ({ name, ...v }));

    res.json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
