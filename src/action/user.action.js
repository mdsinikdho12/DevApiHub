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

export async function getUserLimit(userId) {
  try {
    await ConnectDB();
    const User = await usermodel.findById(userId);
    const copeidToday = User.apiCopeyLimit.copeidToday;
    const Dailylimit = User.apiCopeyLimit.daily;

    return {
      copeidToday,
      Dailylimit,
    };
  } catch (error) {
    return {
      error,
    };
  }
}
