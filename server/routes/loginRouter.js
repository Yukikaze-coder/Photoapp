import express from "express";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import knex from "../knex.js";

// dotenv.config({ path: "../../.env" });
dotenv.config();
const loginRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

loginRouter.post("/", async (req, res) => {
  let { email, password } = req.body;
  const user = await knex("users").where({ email }).first();
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      resultMessage: "success",
      resultCode: 1,
      token,
    });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default loginRouter;
