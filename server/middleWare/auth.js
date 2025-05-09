import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

import bcrypt from "bcrypt";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  // Check header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [_bearer, token] = authHeader.split("Bearer ");

  //  Verify token — throws error if invalid/expired
  try {
    const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) console.error("jwt verify error:", err);
    });
    // Attach user data to request object
    req.user = decoded;
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "An error occured when authorizing user.", error });
  }

  next(); // continue to route handler
}
