import mongoose from "mongoose";
const schema = mongoose.Schema;
export const movieSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "movies" }
);
