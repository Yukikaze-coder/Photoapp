import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import knex from "../knex.js";
import { readFile } from "fs/promises";
import express from "express";
import exif from "exif-parser";
const imageRouter = express.Router();

// Define routes
imageRouter.get("/", async (req, res) => {
  //A router that return all photo that exist in data
  const id = Number(req.query.id);
  const filename = await knex("photos")
    .where({ id: id })
    .select("filename")
    .first();
  const filePath = path.resolve("data", filename);
  const data = await readFile(filePath, { encoding: "base64" });
  res.json({
    resultMessage: "success",
    resultCode: 1,
    data: {
      img: data,
    },
  });
});

imageRouter.post("/", async (req, res) => {
  const data = req.body.formData;
  console.log(data);

  res.json({ message: "got data", data });
});

// imageRouter.post("/", async (req, res) => {
//   const data = req.body.formData;
//   console.log("data recieved by server:", data);

//   const base64Data = data.includes("base64,") ? data.split(",")[1] : data;
//   const buffer = Buffer.from(base64Data, "base64");
//   //parse the image to base 64, assgin unique name, and save in /data
//   const parser = exif.create(buffer);
//   const result = parser.parse();
//   const tags = result.tags || {};
//   const filename = `${uuidv4()}.jpg`;
//   const filePath = path.resolve("data", filename);
//   await fs.writeFile(filePath, buffer);

//   //read token,find user,add to metadata,push to table
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(" ")[1];
//   const user = await knex("users").select("id").where({ token }).first();
//   if (!user) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
//   const user_id = user.id;
//   await knex("photos").insert({
//     filename,
//     camera_make: tags.Make || null,
//     camera_model: tags.Model || null,
//     date_taken: tags.DateTimeOriginal || null,
//     gps_lat: tags.GPSLatitude || null,
//     gps_lng: tags.GPSLongitude || null,
//     aperture: tags.FNumber || null,
//     exposure_time: tags.ExposureTime || null,
//     user_id: user_id,
//   });
//   //redirect tags to descriptive tags added upon upload
//   if (req.tag) {
//     tags = req.tag;
//     tags = tags.map((element) => {
//       return {
//         name: element,
//       };
//     });
//     const photo_id = knex("photos").select("id").where(filename)[0].id;
//     await knex("tags").insert(tags).onConflict("name").ignore();
//   }
//   tags = tags.map((element) => element.name);
//   tags = tags.map(async (element) => {
//     let id = await knex("tags").select("id").where({ name: element });
//     return id;
//   });
//   tags_photos = tags.map((tag_id) => {
//     {
//       photo_id;
//       tag_id;
//     }
//   });
//   await knex("photos_tags").insert(tags_photos);
//   res.json({
//     resultMessage: "success",
//     resultCode: 1,
//     filename,
//     metadata: tags,
//   });
// });

export default imageRouter;
