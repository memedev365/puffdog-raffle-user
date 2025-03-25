import { FC } from "react";

interface TabBarProps {
  tab: string;
  setTab: Function;
}
const TabBar: FC<TabBarProps> = ({ tab, setTab }) => {
  return (
    <div className="flex flex-row gap-3 w-full mb-3 ml-1 text-[white] mx-auto justify-center items-center">
      <button
        title="View active raffles"
        className={`h-8 uppercase font-bold text-sm duration-300 transition-all px-5 py-1 ${tab === "featured"
          ? "bg-[#fff]/30 text-white"
          : " text-[white] hover:bg-[#fff]/10"
          } border-[1px] border-[#fff]`}
        onClick={() => setTab("featured")}
      >
        featured
      </button>
      <button
        title="View all raffles"
        className={`h-8 uppercase font-bold text-sm duration-300 transition-all px-5 py-1 ${tab === "all"
          ? "bg-[#fff]/30 text-white"
          : "text-[white] hover:bg-[#fff]/10"
          } border-[1px] border-[#fff]`}
        onClick={() => setTab("all")}
      >
        all raffles
      </button>
      <button
        title="View ended raffles"
        className={`h-8 uppercase font-bold text-sm duration-300 transition-all px-5 py-1 ${tab === "past"
          ? "bg-[#fff]/30 text-white"
          : "text-[white] hover:bg-[#fff]/10"
          } border-[1px] border-[#fff]`}
        onClick={() => setTab("past")}
      >
        past raffels
      </button>
    </div>
  );
};

export default TabBar;
