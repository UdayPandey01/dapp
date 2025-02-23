import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="flex flex-wrap gap-4 justify-center items-center w-full max-w-lg mb-6">
              <WalletMultiButton className="bg-[#10B981] hover:bg-[#0E9D74] px-6 py-2 rounded-lg shadow-md w-full sm:w-auto text-center" />
              <WalletDisconnectButton className="bg-[#EF4444] hover:bg-[#D63031] px-6 py-2 rounded-lg shadow-md w-full sm:w-auto text-center" />
            </div>
            <Airdrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
