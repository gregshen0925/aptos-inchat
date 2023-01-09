"use client";

import React, { use, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {
  client,
  Types,
  CREATOR_ADDRESS,
  GROUP_NAME,
  MODULE_ID,
} from "../utils/aptosClient";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

type Props = {
  setInboxModalOn: Function;
};

const InboxModal = ({ setInboxModalOn }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setInboxModalOn(false);
  };
  const { account, signAndSubmitTransaction } = useWallet();

  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const handleConfirm = async () => {
    if (!account?.address && !account?.publicKey) return;
    // claim NFT
    setLoading(true);
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${MODULE_ID}::confirm`,
      type_arguments: [],
      arguments: [CREATOR_ADDRESS, GROUP_NAME],
    };
    const transactionRes = await signAndSubmitTransaction(
      payload
      // txOptions
    );
    await client.waitForTransaction(transactionRes?.hash || "").then(() => {
      // do something
      setLoading(false);
      toast.success("Successfully Claimed Token");
    });
    setInboxModalOn(false);
  };

  return (
    <div className="bg-opacity-80 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative bg-black rounded-2xl shadow dark:bg-black-700  overflow-y-scroll"
        >
          <button
            onClick={() => setInboxModalOn(false)}
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
              Check Your Invitations
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Enter chat groups by register airdroped NFTs
            </p>
            {/* <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul> */}
          </div>
          <div className="flex justify-center p-4">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
            >
              <button
                type="submit"
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl
                disables:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin fill-blue-600 text-gray-200  mx-2"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  "Confirm"
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
