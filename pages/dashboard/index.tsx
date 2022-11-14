import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";

type Props = {};

const DashBoard = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const {
    autoConnect,
    connect,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
    connecting,
    connected,
    disconnecting,
    wallet: currentWallet,
    signMessage,
    signTransaction,
  } = useWallet();

  useEffect(() => {
    setAddress(account?.address?.toString());
    console.log(account);
  }, [connected]);

  return (
    <div className="">
      <Header setConnectModalOn={setConnectModalOn} />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {connected ? (
        <div>
          <MessageList />
          <ChatInput />
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard;
