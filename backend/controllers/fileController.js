const File = require("../models/File");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Upload File
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "SHNOOR_Cloud_Drive",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const file = await File.create({
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    });

    // Send notification to all connected users
    const io = req.app.get("io");

    io.emit("notification", {
      type: "upload",
      message: `${req.file.originalname} uploaded successfully`,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Files
const getFiles = async (req, res) => {
  try {
    const files = await File.find();

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete File
const deleteFile = async (req, res) => {
  try {

    // Find file from MongoDB
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }


    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(file.publicId);


    // Delete file from MongoDB
    await File.findByIdAndDelete(req.params.id);

    // Send notification to all connected users
    const io = req.app.get("io");

    io.emit("notification", {
      type: "delete",
      message: `${file.fileName} deleted successfully`,
    });


    res.status(200).json({
      message: "File deleted successfully",
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
};