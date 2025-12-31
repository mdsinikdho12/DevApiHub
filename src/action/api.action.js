"use server";
import ConnectDB from "@/lib/config/db";
import apimodel from "@/lib/models/apimodel";

export async function getAllapi() {
  try {
    const res = await fetch(process.env.MY_API_DATA, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch API data");
    }

    const data = await res.json();
    return data.entries;
  } catch (error) {
    console.error("Error fetching API data:", error);
    return [];
  }
}

export async function getfreeapi() {
  try {
    await ConnectDB();
    const apis = await apimodel.find().lean();
    return apis;
  } catch (error) {
    console.log("Error", error.message);
    return [];
  }
}
