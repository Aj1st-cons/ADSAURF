import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import fetch from "node-fetch";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import cors from "cors";
app.use(cors());

// Cloudinary config
cloudinary.v2.config({
  cloud_name: "dhekmzldg",
  api_key: "534645945198165",
  api_secret: "RjlUIg9VbPGMpbgH9Y-4cQkDB-c"
});

// Your Cloudinary JSON file URL
const VENDORS_URL = "https://res.cloudinary.com/dhekmzldg/raw/upload/v1755544848/vendors_bmkuev.json";

// Upload new store
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, lat, lng, category, uploaderId } = req.body;

    if (!name || !lat || !lng || !category || !uploaderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload store image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload_stream(
      { folder: "vendors", resource_type: "image" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        const imageUrl = result.secure_url;

        // Fetch existing vendors.json
        const response = await fetch(VENDORS_URL);
        const vendors = await response.json();

        // Add new vendor
        vendors[name] = {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          categories: [category],
          image: imageUrl,
          uploaderId
        };

        // Re-upload updated JSON to Cloudinary
        const uploadJson = await cloudinary.v2.uploader.upload_stream(
          { folder: "vendors", public_id: "vendors", resource_type: "raw", overwrite: true },
          (err, resultJson) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, vendor: vendors[name] });
          }
        );

        // Pipe JSON to Cloudinary
        const stream = uploadJson;
        stream.end(Buffer.from(JSON.stringify(vendors)));
      }
    );

    // Pipe image buffer
    uploadedImage.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch last 5 uploaded stores for a user
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
