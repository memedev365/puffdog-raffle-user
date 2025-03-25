import { createContext, useState, useEffect, useContext, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/router";

interface Context {
    socket?: Socket;
    counter?: number;
    createRaffle?: number;
    setCreateRaffle?: Function;
    endRaffle?: number;
    setEndRaffle?: Function;
    newBuyTicket?: number;
    setNewBuyTicket?: Function;
    createRaffleData?: {};
    setCreateRaffleData?: Function;
    newBuyTicketId?: string;
    setNewBuyTicketId?: Function;
    newBuyTicketAmount?: number;
    setNewBuyTicketAmount?: Function;
    endRaffleId?: string;
    setEndRaffleId?: Function;
}

const context = createContext<Context>({});
export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
    const [socket, setSocket] = useState<Socket>();
    const [counter, setCounter] = useState<number>(1);
    const [createRaffle, setCreateRaffle] = useState<number>(1);
    const [createRaffleData, setCreateRaffleData] = useState<{}>({})
    const [endRaffle, setEndRaffle] = useState<number>(1);
    const [endRaffleId, setEndRaffleId] = useState<string>("");
    const [newBuyTicket, setNewBuyTicket] = useState<number>(1);
    const [newBuyTicketId, setNewBuyTicketId] = useState<string>("")
    const [newBuyTicketAmount, setNewBuyTicketAmount] = useState<number>(0)

    const socketRef = useRef<Socket | undefined>(undefined);  // Persist socket instance
    const router = useRouter();
    const wallet = useWallet();

    useEffect(() => {
        if (!socketRef.current) {
            console.log("Initializing WebSocket...");

            socketRef.current = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
                transports: ["websocket"],
            });

            socketRef.current.on("connect", () => {
                console.log("✅ Connected to backend:", socketRef.current?.id);
            });

            socketRef.current.on("disconnect", () => {
                console.log("❌ Disconnected from backend:", socketRef.current?.id);
            });

            socketRef.current.on("createdSocket", (data) => {
                setCreateRaffle((prev) => prev + 1);
                setCreateRaffleData(data.data)
                console.log("create raffle")
            });

            socketRef.current.on("buyTicketSocket", (data) => {
                setNewBuyTicketId(data.data.id)
                setNewBuyTicketAmount(data.data.ticket)
                setNewBuyTicket((prev) => prev + 1);
                console.log("buy ticket")
            });

            socketRef.current.on("endRaffleSocket", (data) => {
                setEndRaffleId(data.id)
                setEndRaffle((prev) => prev + 1);
            });
        }

        return () => {
            if (socketRef.current) {
                console.log("Cleaning up WebSocket...");
                socketRef.current.disconnect();
                socketRef.current = undefined;
            }
        };
    }, []);  // Only runs once when the component mounts

    return (
        <context.Provider value={{
            socket: socketRef.current,
            counter,
            createRaffle,
            setCreateRaffle,
            newBuyTicket,
            setNewBuyTicket,
            endRaffle,
            setEndRaffle,
            createRaffleData,
            setCreateRaffleData,
            newBuyTicketId,
            setNewBuyTicketId,
            newBuyTicketAmount,
            setNewBuyTicketAmount,
            endRaffleId,
            setEndRaffleId

        }}>
            {props.children}
        </context.Provider>
    );
};

export default SocketProvider;
