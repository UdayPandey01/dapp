import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
// import "./index.css"

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
        <div className="flex flex-col items-center justify-center mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Solana Airdrop</h2>
            <input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={requestAirdrop}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold rounded-md shadow-md"
            >
                Send Airdrop
            </button>
        </div>
    );
};

export default Airdrop;
