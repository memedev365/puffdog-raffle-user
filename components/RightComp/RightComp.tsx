import inputContext from "@/contexts/inputContext"
import React, { useContext, useEffect, useMemo, useState } from "react"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import { useWallet } from "@solana/wallet-adapter-react";
import TabBar from "../RaffleComp/TabBar";
import RaffleCardSkeleton from "../RaffleComp/RaffleCardSkeleton";
import RaffleCard from "../RaffleComp/RaffleCard";
import { useSocket } from "@/contexts/SocketContext";

export default function RightComp() {
    const { createRaffle, endRaffle, createRaffleData, newBuyTicketId, newBuyTicketAmount, newBuyTicket, endRaffleId } = useSocket();
    const wallet = useWallet();
    const [tab, setTab] = useState("featured");
    const [isLoading, setIsLoading] = useState(false);
    const [raffle, setRaffle] = useState<any[]>([]);
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    });

    // Fetch Raffle Data
    const fetchRaffle = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRaffle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const returnValue = await response.json();
            setRaffle(returnValue);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching the dbUrl:', error);
            return false;
        }
    }

    useEffect(() => {
        setRaffle((prevRaffle) => [createRaffleData, ...prevRaffle])
    }, [createRaffle])

    useEffect(() => {

        if (newBuyTicketId === "" || newBuyTicketAmount === 0) {
            return;
        } else {
            setRaffle(prev =>
                prev.map(item =>
                    item._id === newBuyTicketId
                        ? { ...item, purchasedTickets: item.purchasedTickets + newBuyTicketAmount }
                        : item
                )
            );
        }
    }, [newBuyTicketId, newBuyTicketAmount, newBuyTicket]);


    useEffect(() => {
        fetchRaffle();
    }, []);

    useEffect(() => {
        if (endRaffleId === "") {
            return;
        } else {
            let _raffle = [...raffle];
            const index = _raffle.findIndex((item) => item._id.toString() === endRaffleId);
            if (index !== -1) {
                _raffle.splice(index, 1);
                setRaffle(_raffle);
            } else {
                console.log("Raffle not found with id:", endRaffleId);
            }
        }
    }, [endRaffle, endRaffleId])

    const visibleRaffles = useMemo(() => {
        if (raffle && raffle?.length > 0) {
            if (tab === "featured") {
                return raffle.filter((item) => new Date(item.end_time).getTime() > new Date().getTime())
                    .sort((a, b) => b.end_time - a.end_time);
            } else if (tab === "past") {
                return raffle.filter((item) => new Date(item.end_time).getTime() <= new Date().getTime())
                    .sort((a, b) => b.end_time - a.end_time);
            } else {
                return raffle.sort((a, b) => b.end_time - a.end_time);
            }
        }
    }, [tab, raffle]);

    return (
        <div className={`pt-10 pb-5 flex flex-col w-full max-w-6xl mx-auto h-full px-1 gap-4 `}>
            <TabBar tab={tab} setTab={setTab} />
            <div className="flex flex-wrap justify-center items-start gap-x-4 gap-y-6">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, key) => (
                        <RaffleCardSkeleton key={key} />
                    ))
                    : (
                        visibleRaffles?.map((item, key) => (
                            <RaffleCard
                                raffle={item}
                                className=""
                                key={key}
                            //   getAllData={() => getAllNfts(false)}
                            />
                        ))
                    )
                }
            </div>
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert
                    onClose={() => setAlertState({ ...alertState, open: false })}
                    severity={alertState.severity}
                    className='text-[red]'
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
