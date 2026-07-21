export default function PortfolioCoinModalSkeleton() {
  const skeletonClass = "bg-slate-300 animate-pulse [animation-duration:2s]";

  return (
    <>
      <div className="bg-background dark:border-white/10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between  px-5 py-5 dark:border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-full ${skeletonClass}`} />

              <div className="space-y-2">
                <div className={`h-4 w-40 rounded-full ${skeletonClass}`} />
                <div className={`h-3 w-24 rounded-full ${skeletonClass}`} />
              </div>
            </div>

            <div className={`h-6 w-8 rounded-xl ${skeletonClass}`} />
          </div>
        ))}
      </div>

      <div className="overflow-y-auto bg-background p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-16 w-16 rounded-full ${skeletonClass}`} />

              <div className="space-y-3">
                <div className={`h-4 w-32 rounded-full ${skeletonClass}`} />
              </div>
            </div>
          </div>

          <div className=" pt-5 dark:border-white/5">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className={`h-4 w-20 rounded-full ${skeletonClass}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl  dark:border-white/5">
            <div className={`h-[280px] w-full ${skeletonClass}`} />
          </div>
        </div>
      </div>
    </>
  );
}
