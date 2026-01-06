import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import ConnectDB from "@/lib/config/db";
import usermodel from "@/lib/models/usermodel";
import { BadgePoundSterling } from "lucide-react";

export const authOptions = {
  // auth providers array
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

  callback: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (!token.role) {
        const dbuser = await usermodel.findOne({ email: token.email });
        if (dbuser) {
          token.role = dbuser.role;
        }
      }

      return token;
    },
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.role = token.role;

    return session;
  },
};
