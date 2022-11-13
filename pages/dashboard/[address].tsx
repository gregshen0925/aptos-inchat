import React from "react";
import ChatInput from "../../components/ChatInput";
import Header from "../../components/Header";
import MessageList from "../../components/MessageList";
import { AptosWalletProvider } from "../../context/AptosWalletProvider";
import "../../styles/styles.css";
import "../../styles/globals.css";

interface Props {}

const page = (props: Props) => {
  return (
    <AptosWalletProvider>
      <Header />
      <MessageList />
      <ChatInput />
    </AptosWalletProvider>
  );
};

export default page;
