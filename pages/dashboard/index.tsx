import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";
import InviteModal from "../../components/InviteModal";
import InboxModal from "../../components/InboxModal";
import TransferModal from "../../components/TransferModal";
import { AptosClient } from "aptos";
import Register from "../../components/Register";
import Loading from "../../components/Loading";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const { account, connected, wallet: currentWallet } = useWallet();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setAddress(account?.address?.toString());
    // console.log(account);
  }, [connected]);

  useEffect(() => {
    // check if connected
    if (!connected || !address) {
      return;
    }
    // setLoading
    setLoading(true);
    // check if registered
    const getUserName = async () => {
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
          return username;
        })
        .catch((err) => {
          console.log(err);
          return "";
        });

      setUsername(username);
      console.log(username);
      setLoading(false);
    };

    getUserName();
  }, [connected, address]);

  return (
    <div className="bg-black h-screen">
      <title>ChatIn Dashboard</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="https://i.imgur.com/W7K187R.png" />
      <Header
        setConnectModalOn={setConnectModalOn}
        setInviteModalOn={setInviteModalOn}
        setTransferModalOn={setTransferModalOn}
        setInboxModalOn={setInboxModalOn}
        username={username}
      />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {inviteModalOn ? (
        <InviteModal setInviteModalOn={setInviteModalOn} />
      ) : null}
      {transferModalOn ? (
        <TransferModal setTransferModalOn={setTransferModalOn} />
      ) : null}
      {inboxModalOn ? <InboxModal setInboxModalOn={setInboxModalOn} /> : null}

      {!connected ? (
        <div>
          <div className="font-bold text-2xl sm:text-4xl text-white pt-10 text-center">
            Please Connect Wallet First
          </div>
          <div className="text-white text-center py-5 text-lg">
            Reminder: Switch to devnet and get airdrop APT for gas fee
          </div>
        </div>
      ) : loading ? (
        <div>
          <Loading />
        </div>
      ) : !username ? (
        <div className="flex justify-center">
          <Register setUsername={setUsername} username={username} />
        </div>
      ) : (
        <div className="bg-black">
          <MessageList username={username} />
          <ChatInput username={username} />
        </div>
      )}
    </div>
  );
};

export default Home;
