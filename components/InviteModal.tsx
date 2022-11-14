import React, { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

type Props = {
  setInviteModalOn: Function;
};

const InviteModal = ({ setInviteModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setInviteModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="bg-opacity-80 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed flex items-center justify-center z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative bg-black rounded-lg shadow dark:bg-black-700 border-[1px] border-white overflow-y-scroll"
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
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Send request by airdrop NFT to friends and wait for acception
            </p>
            {/* <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
