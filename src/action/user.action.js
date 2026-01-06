"use server";
import ConnectDB from "@/lib/config/db";
import usermodel from "@/lib/models/usermodel";
import bcrypt from "bcrypt";

export async function createUser({ name, email, password }) {
  try {
    await ConnectDB();
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are require",
      };
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
    const newUser = await usermodel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
