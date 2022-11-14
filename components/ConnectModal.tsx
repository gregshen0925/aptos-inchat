"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import useOnClickOutside from "../hooks/useOnClickOutside";

interface Props {
  setConnectModalOn: Function;
}

const index = ({ setConnectModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setConnectModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const { wallets, wallet: currentWallet, connect } = useWallet();

  const renderWalletConnectorGroup = () => {
    return wallets.map((wallet) => {
      const option = wallet.adapter;
      return (
        <motion.div
          whileTap={{
            scale: 0.8,
            rotate: 0,
            borderRadius: "100%",
          }}
          key={wallet.adapter.name}
        >
          <li>
            <div className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-500 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-500 dark:text-white">
              <button
                onClick={() => {
                  connect(option.name);
                  setConnectModalOn(false);
                }}
                id={option.name.split(" ").join("_")}
                key={option.name}
                // className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base">
                className="w-full"
              >
                <div className="flex space-x-4">
                  <img className="h-8 w-8 rounded-full" src={option.icon} />
                  <div className="pt-1">{option.name}</div>
                  {option.name == "Martian" ||
                  option.name == "Petra" ||
                  option.name == "Blocto" ? (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-400 bg-gray-200 rounded dark:bg-gray-700">
                      Popular
                    </span>
                  ) : null}
                </div>
              </button>
            </div>
          </li>
        </motion.div>
      );
    });
  };

  return (
    <div className="bg-opacity-80 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative rounded-lg shadow bg-black border-[1px] border-white overflow-y-scroll"
        >
          <button
            onClick={() => setConnectModalOn(false)}
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

          <div className="py-4 px-6 rounded-t border-b border-gray-800">
            <h3 className="text-base font-semibold lg:text-2xl text-white ">
              Connect Wallet
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-400">
              Connect with one of the following wallets.
            </p>
            <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
