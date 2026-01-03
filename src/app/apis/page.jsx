import ApiSearchBar from "../Components/Searchfeild";
import Allapi from "../Components/Allapi";

function page({ searchParams }) {
  return (
    <div className="max-w-7xl mx-auto w-full  mt-10">
      <ApiSearchBar />
      <Allapi searchParams={searchParams} />
    </div>
  );
}

export default page;
