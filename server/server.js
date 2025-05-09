import express from "express";

import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import authMiddleware from "./middleWare/auth.js";
import commentRouter from "./routes/commentRouter.js";
import galleryRouter from "./routes/galleryRouter.js";
import imageRouter from "./routes/photoRoutes.js";
import loginRouter from "./routes/loginRouter.js";
import searchRouter from "./routes/searchRouter.js";
import signupRouter from "./routes/signupRoute.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/photo_app/dist")));

const PORT = 3000;

app.get("/api/test", authMiddleware, (req, res) =>
  res.json({ message: "this is a test" })
);
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/image", authMiddleware, imageRouter);
app.use("/api/images", authMiddleware, imageRouter);
app.use("/api/comments", authMiddleware, commentRouter);
app.use("/api/gallery", authMiddleware, galleryRouter);
app.use("/api/search", authMiddleware, searchRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
