"use server";

import ConnectDB from "@/lib/config/db";
import apimodel from "@/lib/models/apimodel";

export async function seacrhApis({ category, search }) {
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

    pipeline.push({ $limit: 20 });
    const data = await apimodel.aggregate(pipeline);
    return data;
  } catch (error) {
    console.log("Search api Error", error);

    return [];
  }
}
