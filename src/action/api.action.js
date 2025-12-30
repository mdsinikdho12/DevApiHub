"use server";

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
