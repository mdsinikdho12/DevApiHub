"use server";

import ConnectDB from "@/lib/config/db";
import apimodel from "@/lib/models/apimodel";
import { cache } from "react";

export async function seacrhApis({ category, search, page = 1, limit = 10 }) {
  try {
    await ConnectDB();

    const pipeline = [];

    if (search) {
      pipeline.push({
        $search: {
          index: "apiSearch",
          text: {
            query: search,
            path: ["name", "description"],
            fuzzy: { maxEdits: 1 },
          },
        },
      });
    }

    if (category && category !== "All categories") {
      pipeline.push({
        $match: { category },
      });
    }

    pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    const data = await apimodel.aggregate(pipeline);
    return data;
  } catch (error) {
    console.log("Search api Error", error);

    return [];
  }
}
