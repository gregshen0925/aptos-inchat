"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  setConnectModalOn: Function;
};

const Header = ({ setConnectModalOn }: Props) => {
  const { account, disconnect, connected, wallet: currentWallet } = useWallet();

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-5 sm:p-10 shadow-sm">
      <div className="flex space-x-2">
        <Link href={"/dashboard/1"}>
          <Image
            className="mx-2 object-contain grayscale hover:grayscale-0"
            height={10}
            width={50}
            src="https://i.imgur.com/n7kEnSq.png"
            alt="Profile Picture"
          />
        </Link>
        <div>
          <p className="text-blue-400">Logged in as:</p>
          <p className="font-bold text-lg">Greg Shen</p>
        </div>
      </div>
      <div>
        <div className="button-container-1">
          <span className="mas">
            {connected ? "Disconnect" : "Connect Wallet"}
          </span>
          <button
            onClick={() => (connected ? disconnect() : setConnectModalOn(true))}
            type="button"
            name="Hover"
          >
            {connected ? "Disconnect" : "Connect Wallet"}
          </button>
        </div>
        {connected ? (
          <p className="text-center py-1 text-sm text-blue-400 font-semibold">
            {account?.address?.toString().substring(0, 5)}...
            {account?.address
              ?.toString()
              .substring(
                account.address?.toString().length - 5,
                account.address?.toString().length
              )}
          </p>
        ) : null}
      </div>
    </header>
  );
  // return (
  //   <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
  //     <div className="flex flex-col items-center space-y-5">
  //       <div className="flex space-x-2 items-center">
  //         <Image
  //           src="https://i.imgur.com/n7kEnSq.png"
  //           height={10}
  //           width={50}
  //           alt="logo"
  //         />

  //         <p className="text-blue-400 font-bold">
  //           This is an app for showing Aptos Token Design
  //         </p>
  //       </div>
  //       <Link
  //         href="/auth/signin"
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //       >
  //         Sign In
  //       </Link>
  //     </div>
  //   </header>
  // );
};

export default Header;
