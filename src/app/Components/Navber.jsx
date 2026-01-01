import Image from "next/image";
import Link from "next/link";
import GithubButton from "./GithubButton";

function Navber() {
  return (
    <nav className=" sticky top-4 z-500 px-4">
      <div className="max-w-7xl flex items-center justify-between p-3  bg-[#0F1720]  mx-auto w-full  h-[80px] rounded-2xl">
        <Link href="/" className="flex items-center relative h-full ">
          <Image
            src="Logo.svg"
            width={110}
            height={110}
            alt="DevApiHub Logo"
            className="ml-1 p-2"
            priority
          />
        </Link>

        <GithubButton />
      </div>
    </nav>
  );
}

export default Navber;
