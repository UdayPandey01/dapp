import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");

    async function requestAirdrop() {
        if (!wallet.publicKey) {
            alert("Wallet not connected");
            return;
        }

        const airdropAmount = parseFloat(amount);
        if (isNaN(airdropAmount) || airdropAmount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                airdropAmount * LAMPORTS_PER_SOL
            );

            console.log("Transaction Signature:", signature);
            alert(`Airdrop requested! Waiting for confirmation...`);

            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction(
                {
                    blockhash: latestBlockHash.blockhash,
                    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                    signature: signature,
                },
                "finalized"
            );

            alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed! Check console for details.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200 text-center">
                💸 Solana Airdrop
            </h2>
            <input
                type="number"
                placeholder="Enter amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 mb-4 border border-gray-700 bg-[#1A1A1A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
            <button
                onClick={requestAirdrop}
                className="w-full py-3 px-6 bg-[#00ADB5] hover:bg-[#008B94] transition-all text-white font-bold rounded-md shadow-md"
            >
                Send Airdrop
            </button>
        </div>
    );
};

export default Airdrop;
