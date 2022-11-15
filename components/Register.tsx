"use client";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useState } from "react";
import { Types } from "aptos";
import { AptosClient } from "aptos";
import { uploadAssetToIpfs } from "../utils/uploadIPFS";

type Props = {
  setUsername: Function;
};

const Register = ({ setUsername }: Props) => {
  const [input, setInput] = useState<string>("");
  const [imageToUpload, setImageToUpload] = useState<File>();
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
    if (!imageToUpload) {
      return;
    }

    const { path } = await uploadAssetToIpfs(imageToUpload);

    if (account?.address || account?.publicKey) {
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function:
          "0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9::injoin_v1::register",
        type_arguments: [],
        arguments: [input!, "", path],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      const client = new AptosClient(
        // "https://fullnode.mainnet.aptoslabs.com/v1"
        "https://fullnode.devnet.aptoslabs.com/v1"
      );
      await client.waitForTransaction(transactionRes?.hash || "").then(() => {
        setUsername(input);
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
            User Name
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
          Avatar
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
