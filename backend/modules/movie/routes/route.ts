import express, { Response } from "express";
import { Movies } from "../../../db/model/movieModel";
import { IAuthRequest } from "../../../src/index";
import { create } from "domain";

export const movieRouter = express.Router();

// movieRouter.get("/", async (req, res) => {
//   const movies = await Movies.find();
//   res.send(movies);
// });

movieRouter.get("/:id", async (req: IAuthRequest, res: Response) => {
  const { id } = req.params;
  const movie = await Movies.findById(id);
  res.send(movie);
});

movieRouter.post("/", async (req: IAuthRequest, res: Response) => {
  const { title, description, genre, image } = req.body;
  const { userId } = req.user || {};

  const movie = await Movies.create({
    title,
    description,
    genre,
    image,
    createdBy: userId,
  });
  res.send(movie);
});

movieRouter.put("/:id", async (req: IAuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, genre, image, createdBy } = req.body;
  const movie = await Movies.findByIdAndUpdate(
    id,
    { title, description, genre, image, createdBy },
    { new: true }
  );
  res.send(movie);
});

movieRouter.delete("/:id", async (req: IAuthRequest, res: Response) => {
  const { id } = req.params;
  const movie = await Movies.findByIdAndDelete(id);
  res.send(movie);
});

movieRouter.get("/", async (req: IAuthRequest, res: Response) => {
  const { title } = req.query;

  const { userId } = req.user || {};

  const query: any = {
    createdBy: userId,
  };

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  const movies = await Movies.find(query);
  console.log(2);
  res.send(movies);
});
