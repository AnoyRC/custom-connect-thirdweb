import Dialog from "@/components/dialog";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import { Roboto } from "next/font/google";
import { useState } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home() {
  const [handleDialog, setHandleDialog] = useState(false);
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const disconnect = useDisconnect();

  const handleConnect = () => {
    if (connectionStatus === "connected") {
      disconnect();
    } else {
      setHandleDialog(true);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {/* Custom Connect Wallet Button */}
      <div
        className="transition ease-linear duration-300 rounded-3xl text-[#191919] p-4 px-5 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl"
        onClick={handleConnect}
      >
        <h1 className={`text-lg font-bold ${roboto.className} font-bold`}>
          {connectionStatus === "connected" ? "Disconnect" : "Connect Wallet"}
        </h1>
      </div>

      {/* Connection Status */}
      <div className="fixed h-screen w-screen flex flex-col justify-end items-center -z-10">
        <h1 className={`text-lg ${roboto.className} text-white mb-5`}>
          {connectionStatus === "connected"
            ? `You are Connected with address : ${address}`
            : "You are not Connected"}
        </h1>
        <h1
          className={`text-base ${roboto.className} text-white mb-5 text-center`}
        >
          Custom Connect Wallet Button
          <br />
          Supports Metamask and WalletConnect
          <br /> Can you add more?
        </h1>

        {/* thirdweb Connect Wallet Button (Non Clickable) */}
        <div className=" mb-5 ">
          <ConnectWallet />
        </div>
        <h1
          className={`text-base ${roboto.className} text-white mb-5 text-center`}
        >
          {"thirdweb Connect Wallet Button (Non Clickable)"}
        </h1>
      </div>

      {/* Wallet Selector Dialog Box */}
      {handleDialog && <Dialog dialogHandler={setHandleDialog} />}
    </div>
  );
}
