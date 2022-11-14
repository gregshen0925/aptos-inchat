import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";
import { Message } from "../../typing";
import InviteModal from "../../components/InviteModal";
import InboxModal from "../../components/InboxModal";
import { AptosClient, TokenClient } from "aptos";
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
  const [registered, setRegistered] = useState<number>(0);

  useEffect(() => {
    setAddress(account?.address?.toString());
    console.log(account);
  }, [connected]);

  useEffect(() => {
    if (!connected) {
      return;
    }
    const checkIfRegistered = async () => {
      const client = new AptosClient(
        "https://fullnode.mainnet.aptoslabs.com/v1"
      );
      // const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1")

      const user_minted = await client
        .getTableItem("mpu_handle", {
          key_type: "address",
          value_type: "u64",
          key: address,
        })
        .then((mintedAmount) => mintedAmount)
        .catch(() => 0);

      // setRegistered(user_minted);
      console.log(user_minted);
    };

    checkIfRegistered();
  }, [connected, account]);

  return (
    <div className="">
      <Header
        setConnectModalOn={setConnectModalOn}
        setInviteModalOn={setInviteModalOn}
        setInboxModalOn={setInboxModalOn}
      />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {inviteModalOn ? (
        <InviteModal setInviteModalOn={setInviteModalOn} />
      ) : null}
      {inboxModalOn ? <InboxModal setInboxModalOn={setInboxModalOn} /> : null}

      {connected && !registered ? (
        <div className="flex justify-center">
          <Register />
        </div>
      ) : null}
      {connected ? (
        <div>
          <MessageList initialMessages={messages} />
          <ChatInput />
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
    props: { messages }, // will be passed to the page component as props
  };
}
