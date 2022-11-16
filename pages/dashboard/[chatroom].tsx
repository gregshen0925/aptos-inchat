import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ConnectModal from "../../components/ConnectModal";
import MessageList from "../../components/MessageList";
import ChatInput from "../../components/ChatInput";
import InviteModal from "../../components/InviteModal";
import InboxModal from "../../components/InboxModal";
import TransferModal from "../../components/TransferModal";
import Register from "../../components/Register";
import Loading from "../../components/Loading";
import WalletInfoModal from "../../components/WalletInfoModal";
import { client, MODULE_ADDRESS } from "../../utils/aptosClient";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const [haveToken, setHaveToken] = useState<boolean>(false);
  const {
    account,
    connected,
    wallet: currentWallet,
    network,
    connect,
  } = useWallet();
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [walletInfoModalOn, setWalletInfoModalOn] = useState<boolean>(false);

  const targetNetwork = "Testnet";

  useEffect(() => {
    setLoading(true);
    setAddress(account?.address?.toString());
  }, [connected, account]);

  useEffect(() => {
    // check if connected
    if (!connected || !address || !(network?.name?.toString() === "Testnet")) {
      setLoading(true);
      return;
    }
    setLoading(true);
    // check if registered
    const getUserName = async () => {
      await client
        .getAccountResource(
          address,
          `${MODULE_ADDRESS}::profile::Profile`,
        )
        .then((profile) => {
          //@ts-ignore
          setUsername(profile.data.username);
          //@ts-ignore
          setAvatar("https://ipfs.io/ipfs/" + profile.data.avatar);
        })
        .catch((err) => {
          console.log(err);
          setUsername("");
          setAvatar("");
        });
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
          username={username}
        />
      ) : null}
      {network && !(network.name?.toString() === targetNetwork) && (
        <div className="text-white text-center font-bold pt-10">
          Change Your Network to {targetNetwork}!
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
          <MessageList username={username} haveToken={true} />
          <ChatInput username={username} avatar={avatar!} haveToken={true} />
        </div>
      )}
    </div>
  );
};

export default Home;
