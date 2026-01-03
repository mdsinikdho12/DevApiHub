import CardSkeleton from "@/app/Components/CardSkeletion";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
