import { FC, useMemo } from "react";
import { useWindowSize } from "react-use";
import { useRouter } from "next/router";
import ContentLoader from "react-content-loader";

const RaffleCardSkeleton: FC = () => {
  const { width } = useWindowSize();
  const router = useRouter();

  const cardWidth = useMemo(() => {
    if (width >= 1536) {
      return (1536 - 24 * 3 - 48) / 4 - 0;
    } else if (width > 1240 && width < 1536) {
      return (width - 48 - 26 * 3) / 4 - 2;
    } else {
      return (width - 48 - 26 * 3) / 3 - 2;
    }
  }, [width, router]);

  return (
    <div
      className="rounded-3xl border-[1px] border-[#666] sm:ring-1 backdrop-blur-md sm:ring-gray-900/10 overflow-hidden group m-2"
      style={{ width: cardWidth }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: cardWidth, height: cardWidth }}
      >
        <ContentLoader
          speed={3}
          width={cardWidth}
          height={cardWidth}
          viewBox={`0 0 ${cardWidth} ${cardWidth}`}
          backgroundColor="#ffffff33"
          foregroundColor="#ffffff44"
        >
          <rect width={cardWidth} height={cardWidth} />
        </ContentLoader>
      </div>
      <div className="px-5 py-4">
        <div className="">
          <ContentLoader
            speed={3}
            width={160}
            height={28}
            viewBox={`0 0 ${160} ${28}`}
            backgroundColor="#ffffff33"
            foregroundColor="#ffffff44"
          >
            <rect width={160} rx={4} ry={4} height={28} />
          </ContentLoader>
          <div className="flex items-center justify-between py-3">
            <p className="text-xl font-bold">
              <ContentLoader
                speed={3}
                width={75}
                height={28}
                viewBox={`0 0 ${75} ${28}`}
                backgroundColor="#ffffff33"
                foregroundColor="#ffffff44"
              >
                <rect width={75} rx={4} ry={4} height={28} />
              </ContentLoader>
            </p>
            <p className="text-sm text-[#aaa]">
              <ContentLoader
                speed={3}
                width={75}
                height={28}
                viewBox={`0 0 ${75} ${28}`}
                backgroundColor="#ffffff33"
                foregroundColor="#ffffff44"
              >
                <rect width={75} rx={4} ry={4} height={28} />
              </ContentLoader>
            </p>
          </div>
          <div className="flex justify-center w-full gap-2 pb-2 mt-2">
            <ContentLoader
              speed={3}
              width={cardWidth - 40}
              height={48}
              viewBox={`0 0 ${cardWidth - 40} ${48}`}
              backgroundColor="#ffffff33"
              foregroundColor="#ffffff44"
            >
              <rect width={cardWidth - 40} rx={8} ry={8} height={48} />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleCardSkeleton;
