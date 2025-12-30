import Link from "next/link";

export default function ApiCard({ api }) {
  return (
    <div className=" rounded-lg p-4 shadow hover:shadow-lg transition duration-300 flex flex-col w-[384px] h-[459px] justify-between bg-[#152536]">
      <div>
        <h2 className="text-lg font-bold text-center text-white text-[24px]">
          {api.API}
        </h2>
        <p className="text-white font-medium text-[20px] mt-2">
          {api.Description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm bg-[#7B61FF] font-medium text-white px-2 py-1 rounded-full ">
          {api.Category}
        </span>
        <Link
          href={api.Link}
          target="_blank"
          className="text-sm text-blue-600 hover:underline">
          Visit
        </Link>
      </div>
    </div>
  );
}
