import ConnectDB from "./db";
import usermodel from "../models/usermodel";
import CredentailsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
};
