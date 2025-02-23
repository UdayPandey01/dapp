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
// import "./"

function App() {
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/WyU-CNJMuyp-6lP3XwbM_lJU6MGBQpoA">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white">
            <WalletMultiButton className="mb-4" />
            <WalletDisconnectButton className="mb-4" />
            <Airdrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
