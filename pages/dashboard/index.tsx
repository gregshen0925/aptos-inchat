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
import { ChatInfo } from "../../typing";
import { client, tokenClient, MODULE_ADDRESS } from "../../utils/aptosClient";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const [chatGroupToken, setChatGroupToken] = useState<ChatInfo[]>();
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
          console.log(profile)
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
      await tokenClient
        .getTokenData(
          MODULE_ADDRESS,
          "AptosChatinV1: Justa Liang",
          "Demo Chat"
        )
        .then((tokenData) => {
          console.log(tokenData)
          setChatGroupToken([{
            creator: MODULE_ADDRESS,
            chatName: tokenData.name,
            chatImage: tokenData.uri,
            description: tokenData.description,
          }])
        })
        .catch((err) => {
          console.log(err)
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
        <div className="flex justify-center ">
          <div className="max-w-xl text-white  space-y-5">
            <p className="text-3xl font-bold">
              Aptos Profile System Created by InJoy Labs
            </p>
            <p className="text-xl">
              Universal profile bound with Aptos account
            </p>
            <p className="text-xl">
              Login Apps or Dapps using existing Profile
            </p>
            <p className="text-xl">Share the users between Apps or Dapps</p>
            <p className="text-3xl font-bold">
              Chat room invitation using Aptos Token (NFT)
            </p>
            <p className="text-xl">
              Inviter’s inviting is like offering a token{" "}
            </p>
            <p className="text-xl">
              Invitee’s confirming is like claiming a pending token offer
            </p>
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
          <MessageList
            username={""}
            haveToken={false}
            chatGroupToken={chatGroupToken}
          />
          <ChatInput username={""} avatar={avatar!} haveToken={false} />
        </div>
      )}
    </div>
  );
};

export default Home;
