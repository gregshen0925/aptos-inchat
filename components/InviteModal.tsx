"use client";

import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {
  client,
  Types,
  USER_TABLE_HANDLE,
  CREATOR_ADDRESS,
  GROUP_NAME,
  MODULE_ID,
} from "../utils/aptosClient";
import { motion } from "framer-motion";
type Props = {
  setInviteModalOn: Function;
};

const InviteModal = ({ setInviteModalOn }: Props) => {
  const {
    account,
    signAndSubmitTransaction,
    connected,
    wallet: currentWallet,
    signMessage,
    signTransaction,
  } = useWallet();
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setInviteModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInvite = async () => {
    if (!account?.address && !account?.publicKey) return;
    if (input.length === 66) {
      // mint NFT to someone
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${MODULE_ID}::invite`,
        type_arguments: [],
        arguments: [GROUP_NAME, input],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client.waitForTransaction(transactionRes?.hash || "").then(() => {
        // do something
      });
      setInviteModalOn(false);
    } else {
      const userAddress = await client.getTableItem(USER_TABLE_HANDLE, {
        key_type: "0x1::string::String",
        value_type: `address`,
        key: input,
      });
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${MODULE_ID}::invite`,
        type_arguments: [],
        arguments: [GROUP_NAME, userAddress],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client.waitForTransaction(transactionRes?.hash || "").then(() => {
        // do something
      });
      setInviteModalOn(false);
    }
  };

  return (
    <div className="bg-opacity-80 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative bg-black rounded-2xl shadow dark:bg-black-700  overflow-y-scroll"
        >
          <button
            onClick={() => setInviteModalOn(false)}
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
            <h3 className="text-base font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Invite Someone To Your Chat
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Send request to friends and wait for acception
            </p>
            {/* <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul> */}
            <div className=" w-full flex space-x-2 bg-black justify-center">
              <input
                type="text"
                value={input.trimStart()}
                onChange={handleChange}
                placeholder="Enter address here..."
                className="text-white flex-1 rounded border border-gray-300 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                px-4 py-2 disables:opacity-50 disabled:cursor-not-allowed"
              />
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  type="submit"
                  onClick={handleInvite}
                  disabled={!input.trimStart()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                disables:opacity-50 disabled:cursor-not-allowed"
                >
                  Invite
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
