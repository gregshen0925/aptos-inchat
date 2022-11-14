"use client";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  const [text, count] = useTypewriter({
    words: [`Perfect showcase for Aptos Token Design`],
    delaySpeed: 500,
  });

  return (
    <div>
      <div
        className="bg-[#000000] min-h-screen flex flex-col
          items-center justify-center text-center"
      >
        <div className="flex flex-col items-center">
          <img
            className="rounded-full h-40 w-40 md:h-56 md:w-56"
            src="https://i.imgur.com/JiM4StH.png"
            alt=""
          />
          <img
            className="h-15 w-30 md:h-30 md:w-80"
            src="https://i.imgur.com/MJ9qpSV.png"
            alt=""
          />
        </div>
        <div className="pb-10">
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400 text-xl">
            {text}
          </span>
          <Cursor cursorColor="#333333" />
        </div>
        {/* <div className="flex items-center p-8 animate-pulse">
          <ConnectButton setConnectModalOn={setConnectModalOn} />
        </div>
        {connectModalOn ? (
          <ConnectModal setConnectModalOn={setConnectModalOn} />
        ) : null} */}
        <Link href={"/dashboard/"}>
          <div className="button-container-1">
            <span className="mas">Enter</span>
            <button type="button" name="Hover">
              Enter
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
