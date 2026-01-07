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

export async function getApiCount() {
  try {
    await ConnectDB();

    const count = await apimodel.countDocuments();

    return {
      success: true,
      count: count,
    };
  } catch (error) {
    console.error("Error counting APIs:", error);
    return {
      success: false,
      count: 0,
      error: error.message,
    };
  }
}

export async function addApi({
  icon,
  name,
  description,
  category,
  apiEndpint,
  documentation,
}) {
  try {
    await ConnectDB();
    if (
      !icon ||
      !name ||
      !description ||
      !category ||
      !apiEndpint ||
      !documentation
    ) {
      return {
        success: false,
        message: "All fields are require",
      };
    }

    const newApi = await apimodel.create({
      icon,
      name,
      description,
      category,
      apiEndpint,
      documentation,
    });

    return {
      success: true,
      message: "api added succesfully",
      data: JSON.parse(JSON.stringify(newApi)),
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong on the server",
    };
  }
}
