const router = require("express").Router();
const multer = require("multer");
const format = require('format')
const { v4 : uuidv4 } = require('uuid')
const auth = require("../middleware/auth");
const firebase = require("../config/firebase");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).send("Error: No files found");
  }
  let idv4 = uuidv4()
  const blob = firebase.bucket.file(`images/${idv4}`);

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    console.log(err);
  });

  blobWriter.on("finish", () => {
    let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
    res.status(200).json({
      message: 'File uploaded!',
      url: publicUrl
    });
  });

  blobWriter.end(req.file.buffer);
});

router.post("/video", upload.single("video"), (req, res) => {
  if (!req.file) {
    res.status(400).send("Error: No files found");
  }

  let idv4 = uuidv4()
  const blob = firebase.bucket.file(`videos/${idv4}`);

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    console.log(err);
  });

  blobWriter.on("finish", () => {
    let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
    res.status(200).json({
      message: 'File uploaded!',
      url: publicUrl
    })
  });

  blobWriter.end(req.file.buffer);
});

module.exports = router;
