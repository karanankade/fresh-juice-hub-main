const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  // Sanitize filename: strip directory components and special chars
  filename: (req, file, cb) => {
    const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"));
    }
  },
});

router.get("/", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.post("/", auth, upload.array("files", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: "No files uploaded" });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const items = await Promise.all(
      req.files.map((file) => {
        const media_type = file.mimetype.startsWith("video/") ? "video" : "image";
        return Gallery.create({ url: `${baseUrl}/uploads/${file.filename}`, alt: file.originalname, media_type });
      })
    );
    res.status(201).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (item) {
      // Safely resolve and validate the file path stays within uploadDir
      const filename = path.basename(item.url);
      const filePath = path.resolve(uploadDir, filename);
      if (filePath.startsWith(uploadDir) && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
