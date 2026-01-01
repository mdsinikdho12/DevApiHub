"use server";

import ConnectDB from "@/lib/config/db";
import apimodel from "@/lib/models/apimodel";

export async function seacrhApis({ category, search }) {
  try {
    await ConnectDB();
    let query = {};

    if (category && category !== "All categories") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const data = await apimodel.find(query).lean();
    return data;
  } catch (error) {
    console.log("Search api Error", error);

    return [];
  }
}
