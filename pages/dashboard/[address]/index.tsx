import React from "react";
import ChatInput from "../../../components/ChatInput";
import Header from "../../../components/Header";
import MessageList from "../../../components/MessageList";
import { AptosWalletProvider } from "../../../context/AptosWalletProvider";
import "../../../styles/styles.css";
import "../../../styles/globals.css";
import { Message } from "../../../typing";

interface Props {
  messages: Message[];
}

const page = ({ messages }: Props) => {
  return (
    <div>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </div>
  );
};

export default page;

export async function getServerSideProps() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;
  return {
    props: { messages },
  };
}
