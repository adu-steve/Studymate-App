import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import langChain from "./langchain.js";
import urlLangchain from "./urlLangchain.js";

const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body.message);

  const response = await langChain(req.body.message);
  console.log(response);

  res.status(200).json({ message: response });
});

// New route to handle URL processing
app.post("/process-url", async (req, res) => {
  const url = req.body.url;
  const promptValue = req.body.prompt;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    console.log(`Received URL: ${url}`);
    console.log(`Received prompt: ${promptValue}`);

    // Process the URL with langChain or any other logic
    const response = await urlLangchain(url, promptValue);

    console.log(`AI Response: ${response}`);
    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Error processing URL:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the URL" });
  }
});

// Get list of uploaded files
app.get("/files", (req, res) => {
  const directoryPath = path.join(__dirname, "public");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files!");
    }

    // Get file info and sort by creation time in descending order
    const sortedFiles = files
      .map((fileName) => {
        const filePath = path.join(directoryPath, fileName);
        return {
          name: fileName,
          time: fs.statSync(filePath).birthtime.getTime(),
        };
      })
      .sort((a, b) => b.time - a.time) // Sort files by creation time in descending order
      .map((file) => file.name);

    res.json(sortedFiles); // Send sorted list of file names to client
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
