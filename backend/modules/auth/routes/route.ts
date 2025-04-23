import express from "express";
import { Users } from "../../../db/model/userModel";
export const Authrouter = express.Router();

Authrouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const token = await Users.login({ email, password });

    res.send(token);
  } catch (err: any) {
    console.error(err);
    res.status(400).send(err.message || "Login failed");
  }
});
Authrouter.post("/register", async (req, res) => {
  const { password, email } = req.body;

  const user = await Users.register({ password, email });
  res.send(user);
});
