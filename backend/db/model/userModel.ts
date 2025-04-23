import mongoose, { Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema } from "../schema/userSchema";

interface IUser extends Document {
  email: string;
  password: string;
  getToken(): string;
}

interface UserModel extends Model<IUser> {
  register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser>;
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string>;
}

// Define the User class with methods
class User {
  // Method to generate a JWT token
  getToken(this: IUser): string {
    const token = jwt.sign(
      { userId: this._id },
      process.env.SECRET_KEY as string
    );
    return token;
  }

  // Static method for user registration
  static async register(
    this: UserModel,
    { email, password }: { email: string; password: string }
  ): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
      email,
      password: hashedPassword,
    };

    const user = await this.create(doc);
    return user;
  }

  static async login(
    this: UserModel,
    { email, password }: { email: string; password: string }
  ): Promise<string> {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Email eswel password buruu bn 1");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Email eswel password buruu bn 2");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string
    );
    return token;
  }
}

userSchema.loadClass(User);

export const Users: UserModel = mongoose.model<IUser, UserModel>(
  "Users",
  userSchema
);
