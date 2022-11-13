"use client";
import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import "../styles/styles.css";
import { AptosWalletProvider } from "../context/AptosWalletProvider";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main>
      <AptosWalletProvider>
        <MessageList />
        <ChatInput />
      </AptosWalletProvider>
    </main>
  );
};

export default HomePage;
