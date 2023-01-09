"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { client, Types, MODULE_ID } from "../utils/aptosClient";
import { uploadAssetToIpfs } from "../utils/uploadIPFS";
import { motion } from "framer-motion";

type Props = {
  setUsername: Function;
};

const Register = ({ setUsername }: Props) => {
  const [input, setInput] = useState<string>("");
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    account,
    signAndSubmitTransaction,
    connected,
    wallet: currentWallet,
    signMessage,
    signTransaction,
  } = useWallet();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageToUpload(e.target.files[0]);
    }
  };
  const handleRegister = async () => {
    setLoading(true);
    if (!imageToUpload) {
      setLoading(false);
      return;
    }

    const { path } = await uploadAssetToIpfs(imageToUpload);

    if (account?.address || account?.publicKey) {
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${MODULE_ID}::register`,
        type_arguments: [],
        arguments: [input!, "", "", path],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client
        .waitForTransaction(transactionRes?.hash || "", { checkSuccess: true })
        .then(() => {
          setUsername(input);
          toast.success(
            "Your avatar will show within a minute due to IPFS gateway issue."
          );
          setLoading(false);
        });
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="text-xl text-center py-5 font-bold text-white">
        Register Your Account
      </div>
      <form>
        <div className="py-3">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            User Name(required)
          </label>
          <input
            type="username"
            id="username"
            value={input.trimStart()}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Alice"
            required={true}
          />
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-300">
          Avatar(required)
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={handleFileChange}
          type="file"
          required={true}
        />

        {/* <div className="flex items-start py-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 rounded border  focus:ring-3 focus:ring-blue-300 bg-gray-700 border-gray-600 dark:focus:ring-blue-600 ring-offset-gray-800"
              required={true}
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            I agree with the{" "}
            <a
              href="https://injoylabs.io"
              target="_blank"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div> */}
        <div className="text-red-400 pt-4 animate-pulse">
          Make sure you have claimed airdrop APT in your wallet
        </div>
        <motion.div
          whileTap={{
            scale: 0.8,
            borderRadius: "100%",
          }}
        >
          <div className="flex justify-center py-5">
            <button
              type="button"
              onClick={handleRegister}
              className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 disabled:cursor-not-allowed"
              disabled={
                !input.trimStart()
                // || !imageToUpload
              }
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 my-[2px] mx-2"
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
                "Register"
              )}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default Register;
