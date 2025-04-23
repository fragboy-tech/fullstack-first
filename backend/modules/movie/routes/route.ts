import express from "express";
import { Movies } from "../../../db/model/movieModel";

export const movieRouter = express.Router();

// movieRouter.get("/", async (req, res) => {
//   const movies = await Movies.find();
//   res.send(movies);
// });

movieRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findById(id);
  res.send(movie);
});

movieRouter.post("/", async (req, res) => {
  const { title, description, genre, image } = req.body;
  const movie = await Movies.create({ title, description, genre, image });
  res.send(movie);
});

movieRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, genre } = req.body;
  const movie = await Movies.findByIdAndUpdate(
    id,
    { title, description, genre },
    { new: true }
  );
  res.send(movie);
});

movieRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findByIdAndDelete(id);
  res.send(movie);
});

movieRouter.get("/", async (req, res) => {
  const { title } = req.query;

  const query: any = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  const movies = await Movies.find(query);
  console.log(2);
  res.send(movies);
});
