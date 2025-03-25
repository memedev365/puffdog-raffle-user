import { FC, useMemo } from "react";
import Link from "next/link";
import Countdown from "./Countdown";
import { useWindowSize } from "react-use";
import { useRouter } from "next/router";
import moment from "moment";

interface Props {
  raffle: any;
  className: string;
  getAllData?: any;
}
const RaffleCard: FC<Props> = ({ raffle, getAllData }) => {
  const {
    name,
    entry_fee,
    _id,
    end_time,
    max_tickets,
    image,
    purchasedTickets
  } = raffle;

  const { width } = useWindowSize();
  const router = useRouter();

  const isEnd = new Date(end_time).getTime() < new Date().getTime();

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
    <>
      {!isEnd ?

        <div
          className="border-[1px] border-[#fff] overflow-hidden group flex flex-col shadow-[0px_5px_5px_0px] shadow-[#4154f166]"
          style={{ width: cardWidth }}
        >
          <Link href={`/raffle/${_id}`} passHref>
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{ width: cardWidth, height: cardWidth }}
            >
              <img
                src={image}
                className="object-cover transition-all duration-300 group-hover:scale-105 p-3"
                style={{
                  width: cardWidth,
                  height: cardWidth,
                  filter: `grayscale(${isEnd})`,
                }}
                alt={name}
              />
              {!isEnd ? (
                <Countdown
                  endTimestamp={new Date(end_time).getTime()}
                  className="absolute right-4 top-4 flex border border-[#fff] bg-[#ffffff]/80 text-lg gap-1 px-3 text-[#039e03dd] h-10 items-center"
                  completed={getAllData}
                />
              ) : (
                (
                  <div className="absolute right-4 top-4 flex border border-[#fff] bg-[#ffffff]/80 text-lg gap-1 px-3 text-red-400 h-10 items-center">
                    Ended in:&nbsp;{moment(new Date(end_time).getTime()).fromNow()}
                  </div>
                )
              )}
            </div>
          </Link>
          <div className="p-4 border-[1px] border-[white]">
            <div className="">
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#fff] text-2xl font-500 flex gap-2 items-center justify-start">
                  Title: <strong>{name}</strong>
                </p>

                {/* Tickets left  */}
                <div className="text-left text-white flex items-center flex-col">
                  <p className="text-lg font-bold">
                    {purchasedTickets ? purchasedTickets : 0} / {max_tickets}
                  </p>
                  <p className="text-sm text-[#aaa]">
                    {isEnd ? "Ended" : "Tickets sold"}
                  </p>
                </div>
              </div>
              {(
                <>
                  <div className="flex flex-col items-center justify-between gap-1 py-1">
                    <p className="w-full text-sm text-[#aaa]">Ticket Price</p>
                    {/* //Ticket Price  */}
                    <div className="flex flex-wrap w-full text-right text-white">
                      {Object?.entries(entry_fee).map(([key, value], index) => (
                        (<div key={index} className='w-1/2 flex items-cetner'>
                          <p className='ml-1 capitalize'>{key}</p>
                          :
                          <div className=' text-white break-words px-2'>
                            {value?.toString()}
                          </div>
                        </div>)
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center w-full gap-2">
                    <Link href={`/raffle/${_id}`} passHref>
                      <div className="text-[white] border grid place-content-center border-white h-12 uppercase w-full font-bold transition-all duration-300 hover:bg-[#fff]/10 cursor-pointer px-4 shadow-[0px_5px_5px_0px] shadow-[#4154f166]">
                        view raffle
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        :

        <div
          className="border-[1px] border-[#fff] overflow-hidden group flex flex-col shadow-[0px_5px_5px_0px] shadow-[#4154f166]"
          style={{ width: cardWidth }}
        >
          <div>
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{ width: cardWidth, height: cardWidth }}
            >
              <img
                src={image}
                className="object-cover transition-all duration-300 group-hover:scale-105 p-3"
                style={{
                  width: cardWidth,
                  height: cardWidth,
                  filter: `grayscale(${isEnd})`,
                }}
                alt={name}
              />
              {!isEnd ? (
                <Countdown
                  endTimestamp={new Date(end_time).getTime()}
                  className="absolute right-4 top-4 flex border border-[#fff] bg-[#ffffff]/80 text-lg gap-1 px-3 text-[#039e03dd] h-10 items-center"
                  completed={getAllData}
                />
              ) : (
                (
                  <div className="absolute right-4 top-4 flex border border-[#fff] bg-[#ffffff]/80 text-lg gap-1 px-3 text-[#ff3535] h-10 items-center">
                    Ended in:&nbsp;{moment(new Date(end_time).getTime()).fromNow()}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="p-4 border-[1px] border-[white]">
            <div className="">
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#fff] text-2xl font-500 flex gap-2 items-center justify-start">
                  Title: <strong>{name}</strong>
                </p>

                {/* Tickets left  */}
                <div className="text-left text-white flex items-center flex-col">
                  <p className="text-lg font-bold">
                    {purchasedTickets ? purchasedTickets : 0} / {max_tickets}
                  </p>
                  <p className="text-sm text-[#aaa]">
                    {isEnd ? "Ended" : "Tickets sold"}
                  </p>
                </div>
              </div>
              {(
                <>
                  <div className="flex flex-col items-center justify-between gap-1 py-1">
                    <p className="w-full text-sm text-[#aaa]">Ticket Price</p>
                    {/* //Ticket Price  */}
                    <div className="flex flex-wrap w-full text-right text-white">
                      {Object?.entries(entry_fee).map(([key, value], index) => (
                        (<div key={index} className='w-1/2 flex items-cetner'>
                          <p className='ml-1 capitalize'>{key}</p>
                          :
                          <div className=' text-white break-words px-2'>
                            {value?.toString()}
                          </div>
                        </div>)
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center w-full gap-2">
                    <div >
                      <div className="text-[white] border grid place-content-center border-white h-12 uppercase w-full font-bold transition-all duration-300 hover:bg-[#fff]/10 cursor-pointer px-4 shadow-[0px_5px_5px_0px] shadow-[#4154f166]">
                        view raffle
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default RaffleCard;
