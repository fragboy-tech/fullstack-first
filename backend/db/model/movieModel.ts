import mongoose from "mongoose";
import { movieSchema } from "../schema/movieSchema";
export const Movies = mongoose.model("Movies", movieSchema);
