import express from "express";
import fetch from "node-fetch";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

const SHOPIFY_API = "https://nearbys.online/admin/api/2025-01/custom_collections.json";
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

let vendors = {}; // will be synced with vendors.js

// Load vendors on startup
import("./let-vendors.js").then(m=>vendors=m.vendors);

// API endpoint to create collection + update vendors
app.post("/create-collection", upload.single("image"), async (req,res)=>{
  try {
    const { storeName, storeType, lat, lng } = req.body;
    const imageFile = req.file;

    // Upload image to Shopify (via staged upload)
    let imgBase64 = fs.readFileSync(imageFile.path, "base64");

    // Create collection
    const collectionRes = await fetch(SHOPIFY_API,{
      method:"POST",
      headers:{
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        custom_collection: {
          title: storeName,
          template_suffix: storeType, // e.g. collection.Grocery.liquid
          image: { attachment: imgBase64 }
        }
      })
    });

    const collectionData = await collectionRes.json();

    // Update vendors object
    vendors[storeName] = { lat: parseFloat(lat), lng: parseFloat(lng), categories:[storeType] };

    // Save back to vendors file
    fs.writeFileSync("./let-vendors.js", `export let vendors = ${JSON.stringify(vendors,null,2)};`);

    res.json({ message: "Collection created & vendor updated", collection: collectionData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:"Error creating collection" });
  }
});

app.get("/vendors", (req,res)=>{
  res.json(vendors);
});

app.listen(3000, ()=>console.log("Backend running on 3000"));
