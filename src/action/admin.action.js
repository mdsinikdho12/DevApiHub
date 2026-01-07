"use server";
import ConnectDB from "@/lib/config/db";
import usermodel from "@/lib/models/usermodel";

export default async function getAlluser() {
  try {
    await ConnectDB();

    const allusers = await usermodel.find({}).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allusers)),
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    };
  }
}
