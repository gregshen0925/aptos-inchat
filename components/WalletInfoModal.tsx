"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  setWalletInfoModalOn: Function;
  avatar?: string;
  username: string;
};

const InboxModal = ({ avatar, setWalletInfoModalOn, username }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const router = useRouter();
  const {
    account,
    disconnect,
    connected,
    connecting,
    network,
    wallet: currentWallet,
  } = useWallet();
  const clickOutsidehandler = () => {
    setWalletInfoModalOn(false);
  };
  const handleDisconnect = () => {
    disconnect();
    setWalletInfoModalOn(false);
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(account?.address?.toString() || "");
    setCopied(true);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="bg-opacity-80 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative bg-black rounded-2xl shadow dark:bg-black-700 overflow-y-scroll"
        >
          <button
            onClick={() => setWalletInfoModalOn(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="py-4 px-6 rounded-t border-b dark:border-gray-800">
            <div className="flex justify-center p-5">
              <Image
                className="object-contain bg-white rounded-full "
                height={100}
                width={100}
                src={avatar!}
                alt="Profile Picture"
              />
            </div>
            <div className="space-y-5 flex flex-col items-center">
              <h3 className="text-base font-semibold text-gray-900 lg:text-2xl dark:text-white text-center">
                {username}
              </h3>
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button onClick={handleCopyText} className="cursor-pointer">
                  {copied ? (
                    <div className="text-white font-bold">✅ Copied</div>
                  ) : (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white text-center">
                        {account?.address?.toString().substring(0, 5) +
                          "..." +
                          account?.address
                            ?.toString()
                            .substring(
                              account?.address?.toString().length - 5,
                              account?.address?.toString().length
                            )}
                      </h3>
                    </div>
                  )}
                </button>
              </motion.div>
            </div>
          </div>

          <Link href={`/dashboard/roomA`}>
            <div className="text-white">room A</div>
          </Link>

          <div className="flex justify-center space-x-2 p-6">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
            >
              <button
                onClick={handleDisconnect}
                className="px-2 py-2 bg-gray-600 text-sm text-white rounded-lg hover:bg-gray-500 cursor-pointer"
              >
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
