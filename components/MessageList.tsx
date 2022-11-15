"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typing";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

type Props = {
  username: string;
  initialMessage: Message[];
};

const MessageList = ({ initialMessage, username }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

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
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto bg-gray-800 h-screen rounded-2xl">
      {(messages || initialMessage).map((message) => (
        <MessageComponent
          key={message.id}
          message={message}
          username={username}
        />
      ))}
    </div>
  );
};

export default MessageList;
