import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  })
);

// Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// Endpoint to handle file uploads
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   // Handle the history data if needed
//   //   const history = JSON.parse(req.body.history);

//   // Process the file and history as needed
//   res.json({
//     response: "File uploaded successfully",
//     filename: req.file.filename,
//   });
// });

app.post("/api/upload", async (req, res) => {
  const body = req.body;

  console.log("BODY: ", body);

  return res.status(400).json("No file uploaded");
});
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
