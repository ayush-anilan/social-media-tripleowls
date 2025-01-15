const express = require("express");
const multer = require("multer");
const Submission = require("../models/Submission");
const path = require("path");

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /submit - Handle user submissions
router.post("/submit", upload.array("images", 10), async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map((file) => file.path);

    const newSubmission = new Submission({
      name,
      socialMediaHandle,
      images: imagePaths,
    });

    await newSubmission.save();
    res.status(201).json({ message: "Submission successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit." });
  }
});

// GET /submissions - Fetch all submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch submissions." });
  }
});

module.exports = router;
