"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  setConnectModalOn: Function;
  setInboxModalOn: Function;
  setInviteModalOn: Function;
  setTransferModalOn: Function;
  username: string;
};

const Header = ({
  setConnectModalOn,
  setInboxModalOn,
  setInviteModalOn,
  setTransferModalOn,
  username,
}: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const {
    account,
    disconnect,
    connected,
    connecting,
    wallet: currentWallet,
  } = useWallet();

  useEffect(() => {
    setAddress(account?.address?.toString());
    // console.log(account);
  }, [connected, account]);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-5 sm:p-10 shadow-sm md:px-20 bg-black">
      <div className="flex space-x-2">
        <Link href={"/"}>
          <Image
            className="mx-2 object-contain grayscale hover:grayscale-0 bg-white rounded-lg p-2"
            height={10}
            width={50}
            src="https://i.imgur.com/n7kEnSq.png"
            alt="Profile Picture"
          />
        </Link>
        <div>
          {account ? (
            <div>
              <p className="text-blue-400 font-bold text-lg sm:text-2xl">
                Aptos ChatIn
              </p>
              <p className="font-bold text-sm text-white">
                Logged in as: {username}
              </p>
            </div>
          ) : (
            <div className="text-white font-bold text-lg sm:text-2xl">
              Aptos <span className="text-blue-400">ChatIn</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-10">
        <div className="hidden flex-1 md:inline-flex">
          {connected && username ? (
            <div className="space-x-2 flex">
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  className="px-2 py-2 bg-black text-white rounded-lg border-[1px] border-white font-bold"
                  onClick={() => setInviteModalOn(true)}
                >
                  Invite
                </button>
              </motion.div>
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  className="px-2 py-2 bg-black text-white rounded-lg border-[1px] border-white font-bold"
                  onClick={() => setTransferModalOn(true)}
                >
                  Transfer
                </button>
              </motion.div>

              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  className="px-2 py-2 bg-black text-white rounded-lg border-[1px] border-white font-bold"
                  onClick={() => setInboxModalOn(true)}
                >
                  Inbox
                </button>
              </motion.div>
            </div>
          ) : null}
        </div>
        <div>
          <motion.div
            whileTap={{
              scale: 0.8,
              borderRadius: "100%",
            }}
          >
            <div className="button-container-1">
              <span className="mas">
                {connected ? "Disconnect" : "Connect Wallet"}
              </span>
              <button
                onClick={() =>
                  connected ? disconnect() : setConnectModalOn(true)
                }
                type="button"
                name="Hover"
              >
                {connected ? "Disconnect" : "Connect Wallet"}
              </button>
            </div>
          </motion.div>
          <div className="text-center text-sm font-bold text-white py-1">
            {address
              ? account?.address?.toString().substring(0, 5) +
                "..." +
                account?.address
                  ?.toString()
                  .substring(
                    account?.address?.toString().length - 5,
                    account?.address?.toString().length
                  )
              : null}
          </div>
        </div>
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
