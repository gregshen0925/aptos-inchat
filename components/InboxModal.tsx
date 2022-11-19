"use client";

import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { client, Types, CREATOR_ADDRESS, GROUP_NAME, MODULE_ID } from "../utils/aptosClient";

type Props = {
  setInboxModalOn: Function;
};

const InboxModal = ({ setInboxModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setInboxModalOn(false);
  };
  const { account, signAndSubmitTransaction } = useWallet();

  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const handleConfirm = async () => {
    if (!account?.address && !account?.publicKey) return;
    // claim NFT
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
            <button
              type="submit"
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl
                disables:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
