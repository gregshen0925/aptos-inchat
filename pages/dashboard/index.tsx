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
import WalletInfoModal from "../../components/WalletInfoModal";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const { account, connected, wallet: currentWallet, network } = useWallet();
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [walletInfoModalOn, setWalletInfoModalOn] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setAddress(account?.address?.toString());
    console.log(address);
  }, [connected, account]);

  useEffect(() => {
    // check if connected
    if (!connected || !address || !(network?.name?.toString() == "Devnet")) {
      console.log(network?.name);
      setLoading(true);
      return;
    }
    setLoading(true);
    // check if registered
    const getUserName = async () => {
      const client = new AptosClient(
        // "https://fullnode.mainnet.aptoslabs.com/v1"
        "https://fullnode.devnet.aptoslabs.com/v1"
      );
      const username = await client
        .getAccountResource(
          address,
          "0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9::profile::Profile"
        )
        .then((profile) => {
          //@ts-ignore
          return profile.data.username;
        })
        .catch((err) => {
          console.log(err);
          return "";
        });
      console.log(username);
      setUsername(username);
      setLoading(false);
    };
    getUserName();
  }, [connected, address, network]);

  return (
    <div className="bg-black h-screen">
      <title>Chatin Dashboard</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="https://i.imgur.com/W7K187R.png" />
      <Header
        setConnectModalOn={setConnectModalOn}
        setInviteModalOn={setInviteModalOn}
        setTransferModalOn={setTransferModalOn}
        setInboxModalOn={setInboxModalOn}
        setWalletInfoModalOn={setWalletInfoModalOn}
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
      {walletInfoModalOn ? (
        <WalletInfoModal
          setWalletInfoModalOn={setWalletInfoModalOn}
          avatar={avatar}
        />
      ) : null}
      {network && !(network.name?.toString() == "Devnet") && (
        <div className="text-white text-center font-bold pt-10">
          Change Your Network!
        </div>
      )}

      {!connected ? (
        <div>
          <div className="font-bold text-2xl sm:text-3xl text-white pt-10 text-center">
            Please Connect Wallet First
          </div>
        </div>
      ) : loading ? (
        <div>
          <Loading />
        </div>
      ) : !username ? (
        <div className="flex justify-center">
          <Register setUsername={setUsername} />
        </div>
      ) : (
        <div className="bg-black">
          <MessageList username={username} />
          <ChatInput username={username} avatar={avatar} />
        </div>
      )}
    </div>
  );
};

export default Home;
