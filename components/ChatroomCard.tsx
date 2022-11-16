import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChatInfo } from "../typing";

type Props = { chatInfo: ChatInfo };

const ChatroomCard = ({ chatInfo }: Props) => {
  const [link, setLink] = useState<string>('')
  useEffect(() => {

  }, [])

  return (
    <div className="">
      <Link href={`/dashboard/${chatInfo.chatName}`}>
        <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
          {
            <div className="bg-gradient-to-br p-1 md:p-1 rounded-xl">
              <img
                className="h-100% w-100% rounded-2xl object-cover"
                src={chatInfo.chatImage.slice(0,4) === "http"?
                  chatInfo.chatImage:
                  "ipfs://ipfs.io/ipfs/" + chatInfo.chatImage
                }
                // src={"https://i.imgur.com/n7kEnSq.png"}
                alt=""
              />
            </div>
          }
          <div className="p-5">
            <h2 className="text-xl  text-center font-semibold text-white">
              {chatInfo.chatName}
            </h2>
          </div>
          <p className="mt-2 text-sm font-semibold text-white text-center">
            {chatInfo.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ChatroomCard;
