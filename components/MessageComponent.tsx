import Image from "next/image";
import { Message } from "../typing";
import { useEffect } from "react";
import { useState } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
type Props = {
  message: Message;
};

const MessageComponent = ({ message }: Props) => {
  const { account, disconnect, connected, wallet: currentWallet } = useWallet();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (message.username == account?.address?.toString()) {
      setIsUser(true);
    }
  }, [connected, account, message]);

  return (
    <div className={`flex w-fit ${isUser ? "ml-auto" : null}`}>
      <div className={`flex-shrink-0 pt-2 ${isUser ? "order-2" : null}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>

      <div>
        <div
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {/* {message.username} */}
          {message.username.substring(0, 5)}...
          {message.username.substring(
            message.username.length - 5,
            message.username.length
          )}
        </div>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser ? "text-right" : null
            }`}
          >
            {new Date(message.create_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
