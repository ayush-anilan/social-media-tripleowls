const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const submissionsRoutes = require("./routes/submissions");
const authRoutes = require("./routes/auth");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "https://social-media-tripleowls.vercel.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", submissionsRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
