import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 1) Disk storage: choose destination and filename to avoid collisions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// 2) File filter: accept only png, jpeg/jpg, svg
const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
function fileFilter(req, file, cb) {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only PNG, JPG and JPEG files are allowed"
      )
    );
  }
}

// 3) Limits: protect server from huge files (example 5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
// Single file endpoint. Field name expected: "image"
router.post("/image", upload.single("image"), (req, res) => {
  // multer attached file info to req.file
  if (!req.file) {
    return res.status(400).json({ ok: false, message: "No file uploaded" });
  } else {
    res.send({
      message: "image uploaded",
      image: `/${req.file.path}`,
    });
  }
});

export default router;
