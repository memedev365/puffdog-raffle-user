import { FC } from "react";

interface Props {
  attributes: any[]
}

const WinPrize: FC<Props> = ({ attributes }) => {

  return (
    <div className="w-full sm:ring-1 backdrop-blur-md sm:ring-[#1118271A] border border-[#E5E7EB] p-4 md:p-6 mt-4 lg:mt-6">
      <h5 className="text-xl font-bold text-white capitalize">Win Prize</h5>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {
          attributes && (
            Object.entries(attributes).map((([key, value], index) => (
              value !== null && value !== undefined && (
                <div
                  className="flex flex-row relative px-2 pt-2 border border-[#ffffff30] text-md text-left text-white "
                  key={index}
                >
                  <span className="text-xs text-[#aaa] uppercase absolute left-2 -top-2 bg-[black] px-1">
                    {key}
                  </span>
                  <span className="flex flex-col w-full min-h-[28px]">
                    {(value === undefined || value === null || value === "") ? "None" : value.toString()}
                  </span>
                </div>
              )
            ))
            )
          )
        }
      </div>
    </div>
  )
}

export default WinPrize;