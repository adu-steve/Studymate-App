import express from "express";
import multer from "multer";
import cors from "cors";
import langChain from "./langchain.js";

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

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body.message);

  const response = await langChain(req.body.message);
  console.log(response);

  res.status(200).json({ message: response });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
