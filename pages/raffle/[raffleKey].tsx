"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { UiLayout } from "@/components/UiLayout/UiLayout";
import WinPrize from "@/components/RaffleComp/WinPrize";
import TnC from "@/components/RaffleComp/TNC";
import BuyTickets from "@/components/RaffleComp/BuyTickets";
import { MinusIcon, PlusIcon } from "@/components/SVGIcons";
import { MdOutlineEmail } from "react-icons/md";
import { warningAlert } from "@/components/RaffleComp/ToastGroup";
import { useSocket } from "@/contexts/SocketContext";

const RaffleDetail: NextPage = () => {
  const { newBuyTicketId, newBuyTicket } = useSocket();
  const router = useRouter();
  const wallet = useWallet();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [raffleId, setRaffleId] = useState("");
  const [raffleData, setRaffleData] = useState<any>();
  const [isEnd, setIsEnd] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [userEmail, setUserEmail] = useState("")
  const [isClient, setIsClient] = useState(false);
  const [maxTicket, setMaxTicket] = useState(1);
  const [endRaffle, setEndRaffle] = useState(false);

  const getRaffleOneById = async (id: string) => {
    console.log("get data")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRaffleOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyRaffleId: id }),
      });
      setFetchLoading(true);
      const returnValue = await response.json();
      if (returnValue) {
        setRaffleData(returnValue);
        const remainingTickets = returnValue?.max_tickets - returnValue?.purchasedTickets;
        setMaxTicket(remainingTickets)
        if (remainingTickets === 0) {
          setEndRaffle(true);
        } else {
          setEndRaffle(false);
        }
        const isEnded =
          raffleData?.endTimeStamp && raffleData.endTimeStamp < new Date().getTime();
        setIsEnd(isEnded);
      }
      setFetchLoading(false);

    } catch (error) {
      console.log(error, "____error____");
    }
  }

  useEffect(() => {
    setIsClient(true); // Set to true after the component is mounted on the client
  }, []);

  useEffect(() => {
    if (newBuyTicketId && newBuyTicketId === raffleId) {
      getRaffleOneById(newBuyTicketId)
    }
  }, [newBuyTicket]);

  const incValue = () => {
    if (tickets < maxTicket) {
      setTickets(prev => prev + 1);
    } else {
      setTickets(maxTicket)
      warningAlert("There are no more buyable tickets.");
    }
  };

  const decValue = () => {
    if (tickets > 1) {
      setTickets(prev => prev - 1);
    }
  };

  const handleTicketsChange = (e: any) => {
    if (e.target.value < maxTicket) {
      setTickets(e.target.value as unknown as number);
    } else {
      setTickets(maxTicket)
    }
  };

  const handleEmailChange = (e: any) => {
    setUserEmail(e.target.value)
  }

  useEffect(() => {
    if (router.isReady) {
      const { raffleKey } = router.query;
      if (raffleKey) {
        const id_Raffle = raffleKey.toString();
        setRaffleId(id_Raffle);
        getRaffleOneById(id_Raffle);
      }
    }
  }, [router.isReady, router.query]);

  if (!isClient) return null; // Prevent rendering until on client side

  return (
    <UiLayout>
      <LoadingScreen title="Fetching Raffle Data" loading={fetchLoading} />
      <main className="overflow-hidden min-w-[100vw] min-h-[calc(100vh-80px)] relative bg-[black] after:content-[''] after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[#0000003A] after:absolute flex flex-col items-center h-full w-full ">
        {
          raffleData && (
            <div className="flex gap-4 lg:gap-6 flex-col md:flex-row mt-10 z-10">
              <div className="w-[300px] lg:w-[400px]  mx-auto relative overflow-hidden">
                {isEnd && (
                  <div className="absolute z-10 w-[240px] text-2xl py-1 font-black bg-red-800 text-white text-center -rotate-45 -left-20 top-5">
                    Ended
                  </div>
                )}
                <img
                  src={raffleData?.image}
                  className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] object-cover mx-auto border border-[#ddd] p-5"
                  alt=""
                />
                <div className="w-full sm:ring-1 backdrop-blur-md sm:ring-[#1118271A] border border-[#E5E7EB] p-1.5 md:p-3 capitalize mt-4 lg:mt-6 text-white text-center text-base md:text-xl">
                  max ticket: {raffleData?.purchasedTickets}/ {raffleData?.max_tickets}
                </div>
                <WinPrize attributes={raffleData?.prize} />
              </div>
              <div className="w-full md:w-[calc(100%-316px)] lg:w-[calc(100%-424px)]">
                <h1 className="text-[#fff] text-3xl font-500 flex gap-2 items-center text-[32px] leading-[1.5] font-bold capitalize">
                  {raffleData.name}
                </h1>
                <div className=" sm:ring-1 backdrop-blur-md sm:ring-[#1118271A] border border-[#E5E7EB] p-6 mt-4">
                  <BuyTickets tickets={tickets} raffleData={raffleData} email={userEmail} raffleId={raffleId} endTime={isEnd} endRaffle={endRaffle} />
                  {raffleData?.max_tickets === raffleData?.purchasedTickets ?
                    <div className="flex mx-auto max-w-[300px] flex-row gap-1 text-white text-base md:text-xl justify-center items-center mt-8 px-4 py-2 border-[1px] border-white rounded-2xl">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 4.16675V5.83341M12.5 9.16675V10.8334M12.5 14.1667V15.8334M4.16667 4.16675C3.24619 4.16675 2.5 4.91294 2.5 5.83341V8.33341C3.42047 8.33341 4.16667 9.07961 4.16667 10.0001C4.16667 10.9206 3.42047 11.6667 2.5 11.6667V14.1667C2.5 15.0872 3.24619 15.8334 4.16667 15.8334H15.8333C16.7538 15.8334 17.5 15.0872 17.5 14.1667V11.6667C16.5795 11.6667 15.8333 10.9206 15.8333 10.0001C15.8333 9.07961 16.5795 8.33341 17.5 8.33341V5.83341C17.5 4.91294 16.7538 4.16675 15.8333 4.16675H4.16667Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p>The End Raffle</p>
                    </div>
                    :
                    <>
                      <div className="flex items-center justify-between w-full h-12 gap-4 md:w-2/5 mx-auto mt-4">
                        <button
                          className="grid w-8 h-8 place-content-center border border-[#fff] rounded-full"
                          onClick={decValue}
                        >
                          <MinusIcon color="#fff" />
                        </button>
                        <input
                          value={tickets}
                          onChange={handleTicketsChange}
                          min={1}
                          className="px-2 w-[100px] py-1 pl-4 text-xl text-center border border-[#ddd] text-white h-full bg-[#000] "
                          type="number"
                        />
                        <button
                          className="grid w-8 h-8 place-content-center border border-[#fff] rounded-full"
                          onClick={incValue}
                        >
                          <PlusIcon color="#fff" />
                        </button>
                      </div>
                      <div className="w-full flex flex-row gap-3 items-center justify-center px-3 pt-4">
                        <span className="text-xl text-white font-medium flex flex-row gap-1 items-center">
                          <MdOutlineEmail className="text-2xl" />
                          Email :
                        </span>
                        <input
                          type="email"
                          value={userEmail}
                          onChange={handleEmailChange}
                          placeholder="ex: youremail@gmail.com"
                          className="w-full max-w-[380px] px-3 py-1.5 border-[1px] border-white outline-none bg-[#000] text-white text-base font-serif"
                        />
                      </div>
                    </>
                  }

                </div>
                <TnC />
              </div>
            </div>
          )
        }
      </main>
    </UiLayout>
  )
}

export default RaffleDetail;