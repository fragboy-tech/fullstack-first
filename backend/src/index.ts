import express, { Request, Response, NextFunction } from "express";
export interface IAuthUser {
  userId: string;
}

export interface IAuthRequest extends Request {
  user?: IAuthUser;
}

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { authRouter } from "../modules/auth/routes/route";
import { movieRouter } from "../modules/movie/routes/route";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MONGO");
  })
  .catch((err) => {
    console.log("MONGO connection failed", err);
  });

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.send("Token!!");
  }

  const token = authHeader ? authHeader.split(" ")[1] : undefined;

  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }
    if (!token) {
      throw new Error("Token is undefined");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user as IAuthUser;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};

app.use("/", authRouter);
app.use("/movies", authMiddleware, movieRouter);

app.listen(3000, () => {
  console.log("server started on 3000");
});
