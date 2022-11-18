"use client";

import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Link from "next/link";

type Props = {};

const LogIn = (props: Props) => {
  const [text, count] = useTypewriter({
    words: [`Perfect Showcase For Aptos Token Design`],
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
            className="rounded-full h-40 w-40 md:h-60 md:w-60"
            src="https://i.imgur.com/JiM4StH.png"
            alt=""
          />
          <img
            className="h-15 w-30 md:h-40 md:w-100"
            src="https://i.imgur.com/roc2UVg.png"
            alt=""
          />
        </div>
        <div className="">
          {/* <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400 text-2xl">
            {text}
          </span>
          <Cursor /> */}
          <h1 className="text-2xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-300 px-10 ">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="#447de6" />
          </h1>
        </div>

        <div className="button-container-2">
          <span className="mas1">Enter</span>
          <Link href={"/dashboard"}>
            <button type="button" name="Hover">
              <p className="text-xl sm:text-2xl animate-pulse"> Enter</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
