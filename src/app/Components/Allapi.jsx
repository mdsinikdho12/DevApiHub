import ApiCard from "./CardComponent";
import React from "react";
import { getAllapi, getfreeapi } from "@/action/api.action";

export default async function Allapi() {
  const apiData = await getfreeapi();

  return (
    <div className="max-w-7xl justify-items-center mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {apiData.map((api, index) => (
        <ApiCard key={index} api={api} />
      ))}
    </div>
  );
}
