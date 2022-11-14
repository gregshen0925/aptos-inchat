import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";
import { Message } from "../../typing";
import InviteModal from "../../components/InviteModal";
import InboxModal from "../../components/InboxModal";
import { AptosClient } from "aptos";
import Register from "../../components/Register";

type Props = {
  messages: Message[];
};

const Home = ({ messages }: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const [registerModalOn, setRegisterModalOn] = useState<boolean>(false);
  const { account, connected, wallet: currentWallet } = useWallet();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setAddress(account?.address?.toString());
    // console.log(account);
  }, [connected]);

  useEffect(() => {
    if (!connected || !address) {
      return;
    }
    // console.log("address:", address)
    const checkUsername = async () => {
      const client = new AptosClient(
        // "https://fullnode.mainnet.aptoslabs.com/v1"
        "https://fullnode.devnet.aptoslabs.com/v1"
      );
      const username = await client
        .getTableItem(
          "0x2ff381fa3c00c286d83e16b74e21833649b473a2ed53a1a85a8d53483b133ded",
          {
            key_type: "address",
            value_type: "0x1::string::String",
            key: address,
          }
        )
        .then((username) => {
          console.log(username);
          return username;
        })
        .catch((err) => {
          console.log(err);
          return "";
        });

      setUsername(username);
      // setUsername(1);
      console.log(username);
    };

    checkUsername();
  }, [connected, address]);

  return (
    <div className="">
      <title>InJoin Dashboard</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="https://i.imgur.com/SjaOCZH.png" />
      <Header
        setConnectModalOn={setConnectModalOn}
        setInviteModalOn={setInviteModalOn}
        setInboxModalOn={setInboxModalOn}
        username={username}
      />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {inviteModalOn ? (
        <InviteModal setInviteModalOn={setInviteModalOn} />
      ) : null}
      {inboxModalOn ? <InboxModal setInboxModalOn={setInboxModalOn} /> : null}

      {connected && !username ? (
        <div className="flex justify-center">
          <Register setUsername={setUsername} username={username} />
        </div>
      ) : null}
      {connected && username ? (
        <div>
          <MessageList initialMessages={messages} username={username} />
          <ChatInput username={username} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;
  return {
    props: { messages },
  };
}
