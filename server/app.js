import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import postRoutes from "./routes/posts.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use("/api", postRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

export { app };
