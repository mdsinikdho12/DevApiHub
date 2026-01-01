import ApiCard from "./CardComponent";
import ApiSearchBar from "./Searchfeild";
import { seacrhApis } from "@/action/searchApi.action";

export default async function Allapi() {
  const category = "Entertainment";
  const search = "Programming Jokes API";
  const apiData = await seacrhApis({ category, search });

  return (
    <>
      <ApiSearchBar />
      <div className="max-w-7xl justify-items-center mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {apiData.map((api, index) => (
          <ApiCard key={index} api={api} />
        ))}
      </div>
    </>
  );
}
