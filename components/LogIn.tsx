"use client";
import React, { useState } from "react";
import ConnectButton from "./ConnectButton";
import ConnectModal from "./ConnectModal";
import { Cursor, useTypewriter } from "react-simple-typewriter";

type Props = {};

const Login = (props: Props) => {
  const [connectModalOn, setConnectModalOn] = useState(false);
  const [text, count] = useTypewriter({
    words: [`Perfect showcase for Aptos Token Design`],
    delaySpeed: 500,
  });

  return (
    <div
      className="bg-[#000000]/95 min-h-screen flex flex-col
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
        {/* <h1 className="text-5xl font-bold text-white">Aptos InJoin</h1> */}
      </div>
      <div>
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400 text-xl">
          {text}
        </span>
      </div>
      <div className="flex items-center p-8 animate-pulse">
        <ConnectButton setConnectModalOn={setConnectModalOn} />
      </div>
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
    </div>
  );
};

export default Login;
