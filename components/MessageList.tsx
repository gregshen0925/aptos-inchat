"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { clientPusher } from "../clients/pusher";
import { ChatInfo, Message } from "../typing";
import fetcher from "../utils/fetchMessages";
import Loading from "./Loading";
import MessageComponent from "./MessageComponent";
import { motion } from "framer-motion";
import ChatroomCard from "./ChatroomCard";

type Props = {
  username: string;
  haveToken: boolean;
  chatGroupToken?: ChatInfo[];
};

const MessageList = ({ chatGroupToken, haveToken, username }: Props) => {
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
      {haveToken ? (
        messages ? (
          messages?.map((message) => (
            <MessageComponent
              key={message.id}
              message={message}
              username={username}
            />
          ))
        ) : (
          <Loading />
        )
      ) : (
        <div>
          <div className="text-white text-center font-bold">
            Enter a Chatroom
          </div>
          <div className="px-10">
            <main className="p-10 rounded-lg">
              <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-15">
                {chatGroupToken?.map((chatInfo, i) => (
                  <motion.div
                    whileTap={{
                      scale: 0.8,
                      rotate: 0,
                      borderRadius: "100%",
                    }}
                    key={i}
                    className="py-4"
                  >
                    <ChatroomCard chatInfo={chatInfo} />
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
          {/* 
          <Link href={`/dashboard/roomA`}>
            <div className="text-white text-center py-5">room A</div>
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default MessageList;
