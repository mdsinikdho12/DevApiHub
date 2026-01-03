import ApiSearchBar from "../Components/Searchfeild";
import Allapi from "../Components/Allapi";
import HeadingText from "../Components/Heading/Heading";

function page({ searchParams }) {
  return (
    <div className="max-w-7xl mx-auto w-full  mt-10">
      <HeadingText headingfast={"All Free "} headinglast={"Apis"} />
      <ApiSearchBar />
      <Allapi searchParams={searchParams} />
    </div>
  );
}

export default page;
