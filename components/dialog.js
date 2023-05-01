import { Roboto } from "next/font/google";
import Image from "next/image";
import {
  useMetamask,
  useWalletConnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Dialog(props) {
  const metamask = useMetamask();
  const walletConnect = useWalletConnect();
  const connectionStatus = useConnectionStatus();
  const menu = [
    {
      name: "Metamask",
      icon: "/metamask.svg",
      onClick: metamask,
    },
    {
      name: "WalletConnect",
      icon: "/walletconnect.svg",
      onClick: walletConnect,
    },
  ];

  useEffect(() => {
    if (connectionStatus === "connected") {
      props.dialogHandler(false);
    }
  }, [connectionStatus]);

  return (
    <div className="fixed h-screen w-screen top-0 left-0 bg-slate-700/20 backdrop-blur-[10px] flex items-center justify-center">
      <div className="bg-[#222222] h-[350px] w-[500px] rounded-[40px] p-10">
        <div className="w-[100%] flex items-center justify-between">
          <h1
            className={`${roboto.className} font-semibold text-white text-2xl`}
          >
            {connectionStatus === "connecting"
              ? "Loading..."
              : "Connect Wallet"}
          </h1>
          <div
            className="h-10 w-10 bg-[#404040] rounded-2xl flex items-center justify-center hover:bg-[#3b3b3b] transition-colors duration-300 hover:cursor-pointer"
            onClick={() => props.dialogHandler(false)}
          >
            <Image src="/close.png" height={20} width={20} alt="Close" />
          </div>
        </div>
        {connectionStatus === "connecting" ? (
          <div className="w-[100%] flex flex-col h-[200px] items-center justify-center mt-5">
            <Image src="/loading.gif" height={100} width={100} alt="Loading" />
          </div>
        ) : (
          <div className="w-[100%] flex flex-col h-[200px] mt-5">
            {menu.map((item, index) => (
              <div
                key={index}
                className="w-[100%] h-[50%] mt-5 rounded-xl bg-[#404040] flex p-5 items-center hover:bg-[#3b3b3b] transition-colors duration-300 hover:cursor-pointer"
                onClick={item.onClick}
              >
                <Image
                  src={item.icon}
                  height={20}
                  width={50}
                  alt="Icon"
                  className="object-cover"
                />
                <h1
                  className={`${roboto.className} font-semibold text-white text-xl ml-5`}
                >
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
