"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typing";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

type Props = {
  username: string;
  avatar: string;
};

const ChatInput = ({ avatar, username }: Props) => {
  const [input, setInput] = useState("");
  const { account, disconnect, connected, wallet: currentWallet } = useWallet();
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trimStart()) return;

    const messageToSend = input.trimStart();

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      create_at: Date.now(),
      username: username,
      profilePic: avatar!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 md:px-20 py-5 space-x-2 bg-black justify-center"
    >
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter message here..."
        className="text-white flex-1 rounded border border-gray-300 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                px-5 py-3 disables:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                disables:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
