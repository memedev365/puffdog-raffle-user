import { FC, useCallback, useState } from "react";
import base58 from "bs58";
import { SyncLoader } from "react-spinners";
import { errorAlert, successAlert } from "./ToastGroup";
import { ComputeBudgetProgram, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { transferSol } from '@metaplex-foundation/mpl-toolbox';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { getAssociatedTokenAddress, createTransferCheckedInstruction, createAssociatedTokenAccountIdempotentInstruction } from "@solana/spl-token";

interface Props {
  tickets: number;
  raffleData: any;
  email: string;
  raffleId: string;
  endRaffle: boolean;
  endTime: boolean;
}
const BuyTickets: FC<Props> = ({ tickets, raffleData, email, raffleId, endTime, endRaffle }) => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const connection = new Connection(process.env.NEXT_PUBLIC_DEVNET_RPC, "processed");

  const umi = createUmi(process.env.NEXT_PUBLIC_DEVNET_RPC)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet))

  const TREASURY = new PublicKey(process.env.NEXT_PUBLIC_TREASURY);
  const USDC_MINT = new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT);
  const SSHIB_MINT = new PublicKey(process.env.NEXT_PUBLIC_SSHIB_MINT);
  const PUFF_DOG_MINT = new PublicKey(process.env.NEXT_PUBLIC_PUFF_DOG_MINT);


  const paySol = async (solAmount: number) => {
    if (!wallet.publicKey) {
      errorAlert("Wallet not connected");
      return;
    }
    try {
      const x = await transferSol(umi, {
        //@ts-ignore
        destination: TREASURY,
        amount: {
          basisPoints: BigInt(solAmount * 1e9),
          identifier: "SOL",
          decimals: 9,
        },
      }).sendAndConfirm(umi);

      if (!x.signature) {
        throw new Error("Transaction signature is undefined");
      }

      const signature = base58.encode(x.signature);
      return signature;
    } catch (err) {
      console.error("Sol Payment Failed:", err);
      errorAlert("Sol Payment Failed");
    }

  }

  const payUsdc = async (usdcAmount: number) => {
    if (!wallet.publicKey) {
      errorAlert("Wallet not connected");
      return;
    }

    try {
      const senderTokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
      const recipientTokenAccount = await getAssociatedTokenAddress(USDC_MINT, TREASURY);

      const transaction = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 }),
        createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, recipientTokenAccount, TREASURY, USDC_MINT),
        createTransferCheckedInstruction(
          senderTokenAccount,
          USDC_MINT,
          recipientTokenAccount,
          wallet.publicKey,
          usdcAmount * 1e6, // Convert to USDC smallest unit,
          6
        )
      );
      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      // Use the wallet's signTransaction method to sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);
      console.log(await connection.simulateTransaction(transaction))

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
      });

      return signature;
    } catch (error) {
      console.error("USDC Payment Failed:", error);
      errorAlert("USDC Payment Failed");
    }
  }

  const payPuffDog = async (puffDogAmount: number) => {
    if (!wallet.publicKey) {
      errorAlert("Wallet not connected");
      return;
    }

    try {
      const senderTokenAccount = await getAssociatedTokenAddress(PUFF_DOG_MINT, wallet.publicKey);
      const recipientTokenAccount = await getAssociatedTokenAddress(PUFF_DOG_MINT, TREASURY);

      const transaction = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 }),
        createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, recipientTokenAccount, TREASURY, PUFF_DOG_MINT),
        createTransferCheckedInstruction(
          senderTokenAccount,
          PUFF_DOG_MINT,
          recipientTokenAccount,
          wallet.publicKey,
          puffDogAmount * 1e6, // Convert to USDC smallest unit,
          6
        )
      );
      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      // Use the wallet's signTransaction method to sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);
      console.log(await connection.simulateTransaction(transaction))

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
      });

      return signature;
    } catch (error) {
      console.error("USDC Payment Failed:", error);
      errorAlert("USDC Payment Failed");
    }
  }

  const paySshib = async (sshibAmount: number) => {
    if (!wallet.publicKey) {
      errorAlert("Wallet not connected");
      return;
    }

    try {
      const senderTokenAccount = await getAssociatedTokenAddress(SSHIB_MINT, wallet.publicKey);
      const recipientTokenAccount = await getAssociatedTokenAddress(SSHIB_MINT, TREASURY);

      const transaction = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 }),
        createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, recipientTokenAccount, TREASURY, SSHIB_MINT),
        createTransferCheckedInstruction(
          senderTokenAccount,
          SSHIB_MINT,
          recipientTokenAccount,
          wallet.publicKey,
          sshibAmount * 1e6, // Convert to USDC smallest unit,
          6
        )
      );
      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      // Use the wallet's signTransaction method to sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);
      console.log(await connection.simulateTransaction(transaction))

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
      });

      return signature;
    } catch (error) {
      console.error("USDC Payment Failed:", error);
      errorAlert("USDC Payment Failed");
    }
  }

  const handleBuy = useCallback(async (key: string, value: any, email: string, endTime: boolean, endRaffle: boolean) => {
    if (!wallet.publicKey) {
      errorAlert("Wallet not connected");
      return;
    }

    if (endRaffle === true || endTime === true) {
      errorAlert("The End Raffle");
      return;
    }

    if (tickets <= 0) {
      errorAlert("Invalid tickets count");
      return;
    }

    if (email === "") {
      errorAlert("Please input your email address.");
      return;
    }

    setIsLoading(true);
    try {
      let txSignature = "";
      const userWallet = wallet.publicKey.toBase58();

      if (key === "sol") {
        const solAmount = tickets * parseFloat(value?.toString());
        txSignature = await paySol(solAmount);
      } else if (key === "usdc") {
        const usdcAmount = tickets * parseFloat(value?.toString());
        txSignature = await payUsdc(usdcAmount);
      } else if (key === "sshib") {
        const shhibAmount = tickets * parseFloat(value?.toString());
        txSignature = await paySshib(shhibAmount)
      } else if (key === "puff") {
        const puffDogAmount = tickets * parseFloat(value?.toString());
        txSignature = await payPuffDog(puffDogAmount)
      }

      if (txSignature && txSignature !== undefined && txSignature !== null) {
        console.log(`Transaction Successful: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`);
        successAlert("Transaction confirmed!");
      } else {
        errorAlert("Payment Failed");
        return;
      }

      saveTicket(txSignature, key, tickets, userWallet, email, raffleId)

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [raffleData, tickets, wallet]);

  const saveTicket = async (txSignature: string, key: string, tickets: number, userWallet: string, email: string, raffleId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raffle_Id: raffleId, txSignature: txSignature, key: key, ticket: tickets, email: email, user_wallet_address: userWallet }),
    });
    const returnValue = await response.json();

    console.log("returnValue", returnValue)

  }

  return (
    <div className="text-center flex flex-col w-full items-center gap-3 text-[white]">
      {
        raffleData && (
          Object.entries(raffleData?.entry_fee).map((([key, value], index) => (
            <button
              key={index}
              className="h-[52px] w-full px-8 font-bold md:w-[540px] text-lg md:text-xl capitalize transition-all duration-300 hover:bg-[#fff]/30 disabled:cursor-not-allowed border border-[white]"
              disabled={isLoading}
              onClick={() => handleBuy(key, value, email, endTime, endRaffle)}
            >
              {isLoading ? (
                <SyncLoader color={"#000"} loading={isLoading} size={8} />
              ) : (
                value && (
                  <>
                    Buy {tickets} Ticket{tickets === 1 ? "" : "s"} For{" "}
                    {(tickets * parseFloat(value?.toString())).toLocaleString()} {key}
                  </>
                )
              )}
            </button>
          )))
        )
      }
    </div>
  );
};

export default BuyTickets;
