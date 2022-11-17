"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "./pusher";
import { ChatInfo, Message } from "../typing";
import fetcher from "./fetchMessages";
import Loading from "../components/Loading";
import MessageComponent from "../components/MessageComponent";
import { motion } from "framer-motion";
import ChatroomCard from "../components/ChatroomCard";

type Props = {
  username: string;
  chatGroupToken?: ChatInfo[];
  setPublicRoom: Function;
};

const MessageList = ({ setPublicRoom, chatGroupToken, username }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessagesPublic", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      // no need to update cache if sent by ourselves
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8  max-w-2xl xl:max-w-4xl mx-auto min-h-screen bg-gray-800 rounded-2xl">
      <div className="px-5">
        <button className="text-white" onClick={() => setPublicRoom(false)}>
          ⇦ Last Page
        </button>
      </div>
      {messages ? (
        messages?.map((message) => (
          <MessageComponent
            key={message.id}
            message={message}
            username={username}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MessageList;
