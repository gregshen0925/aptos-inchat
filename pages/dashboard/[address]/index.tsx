import React from "react";
import ChatInput from "../../../components/ChatInput";
import Header from "../../../components/Header";
import MessageList from "../../../components/MessageList";
import { AptosWalletProvider } from "../../../context/AptosWalletProvider";
import "../../../styles/styles.css";
import "../../../styles/globals.css";

interface Props {}

const page = (props: Props) => {
  return (
    <div>
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default page;
