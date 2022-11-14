import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";
import { Message } from "../../typing";
import InviteModal from "../../components/InviteModal";
import InboxModal from "../../components/InboxModal";

type Props = {
  messages: Message[];
};

const Home = ({ messages }: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const { account, connected, wallet: currentWallet } = useWallet();

  useEffect(() => {
    setAddress(account?.address?.toString());
    console.log(account);
  }, [connected]);

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
