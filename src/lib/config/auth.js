import ConnectDB from "./db";
import usermodel from "../models/usermodel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        await ConnectDB();

        const user = await usermodel.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) throw new Error("Wrong password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionPlan: user.subscriptionPlan,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
