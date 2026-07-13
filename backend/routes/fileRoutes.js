const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  uploadFile,
  getFiles,
  deleteFile,
} = require("../controllers/fileController");

// Upload File
router.post("/upload", upload.single("file"), uploadFile);

// Get All Files
router.get("/", getFiles);

// Delete File
router.delete("/:id", deleteFile);

module.exports = router;