"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  setConnectModalOn: Function;
  setInboxModalOn: Function;
  setInviteModalOn: Function;
  registered: number;
};

const Header = ({
  setConnectModalOn,
  setInboxModalOn,
  setInviteModalOn,
  registered,
}: Props) => {
  const {
    account,
    disconnect,
    connected,
    connecting,
    wallet: currentWallet,
  } = useWallet();

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-5 sm:p-10 shadow-sm">
      <div className="flex space-x-2">
        <Link href={"/"}>
          <Image
            className="mx-2 object-contain grayscale hover:grayscale-0"
            height={10}
            width={50}
            src="https://i.imgur.com/n7kEnSq.png"
            alt="Profile Picture"
          />
        </Link>
        <div>
          {account ? (
            <div>
              <p className="text-blue-400 font-bold">Aptos InJoin</p>
              <p className="font-bold text-sm">
                <p className="text-center py-1 text-sm text-blue-400 font-semibold"></p>
                {account?.address?.toString().substring(0, 5)}
                {connecting ? <div>Loading...</div> : <span>...</span>}
                {account?.address
                  ?.toString()
                  .substring(
                    account.address?.toString().length - 5,
                    account.address?.toString().length
                  )}
              </p>
            </div>
          ) : (
            <div className="text-blue-400 font-bold text-lg">Aptos InJoin</div>
          )}
        </div>
      </div>

      {connected && registered ? (
        <div className="space-x-2 flex">
          <motion.div
            whileTap={{
              scale: 0.8,
              borderRadius: "100%",
            }}
          >
            <button
              className="px-2 py-2 bg-black text-white rounded-lg hover"
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
              className="px-2 py-2 bg-black text-white rounded-lg"
              onClick={() => setInboxModalOn(true)}
            >
              Inbox
            </button>
          </motion.div>
        </div>
      ) : null}

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
