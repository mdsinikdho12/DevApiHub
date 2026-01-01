import ApiCard from "./CardComponent";
import { seacrhApis } from "@/action/searchApi.action";

export default async function Allapi({ searchParams }) {
  const params = await searchParams;

  const category = params?.category || "All categories";
  const search = params?.search || "";

  const apiData = await seacrhApis({ category, search });

  return (
    <div className="max-w-7xl justify-items-center mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {apiData && apiData.length > 0 ? (
        apiData.map((api, index) => (
          <ApiCard key={api._id || index} api={api} />
        ))
      ) : (
        <p className="text-slate-400 col-span-full py-20">
          {`No APIs found for "${search}" in ${category}`}{" "}
        </p>
      )}
    </div>
  );
}
