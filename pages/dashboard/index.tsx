import {
  useWallet,
  WalletAdapterNetwork,
} from "@manahippo/aptos-wallet-adapter";
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
import {
  client,
  tokenClient,
  MODULE_ADDRESS,
  CREATOR_ADDRESS,
  COLLECTION_NAME,
  GROUP_NAME,
} from "../../utils/aptosClient";
import Image from "next/image";
import MessageListPublic from "../../public/MessageListPublic";
import ChatInputPublic from "../../public/ChatInputPublic";
import { targetNetwork } from "../../constant";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const [chatGroupToken, setChatGroupToken] = useState<ChatInfo[]>();
  const [publicRoom, setPublicRoom] = useState<boolean>(false);
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

  useEffect(() => {
    setLoading(true);
    setAddress(account?.address?.toString());
  }, [connected, account]);

  useEffect(() => {
    // check if connected
    if (
      !connected ||
      !address ||
      !(network?.name?.toString().toLowerCase() == targetNetwork)
    ) {
      setLoading(true);
      return;
    }
    setLoading(true);
    // check if registered
    const getUserName = async () => {
      await client
        .getAccountResource(address, `${MODULE_ADDRESS}::profile::Profile`)
        .then((profile) => {
          // console.log(profile)
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
        .getTokenData(CREATOR_ADDRESS, COLLECTION_NAME, GROUP_NAME)
        .then((tokenData) => {
          // console.log(tokenData)
          // console.log(tokenData.collection)
          setChatGroupToken([
            {
              creator: "InJoy-Labs",
              collection: "",
              chatName: "Public",
              chatImage: "https://i.imgur.com/1MXoiO1.jpg",
              description: "This is a public room",
            },
            {
              creator: CREATOR_ADDRESS,
              collection: COLLECTION_NAME,
              chatName: tokenData.name,
              chatImage: tokenData.uri,
              description: tokenData.description,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };

    getUserName();
  }, [connected, address, network]);

  return (
    <div className="bg-black min-h-screen">
      <title>InChat Dashboard</title>
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
      {network &&
        !(network.name?.toString().toLowerCase() == targetNetwork) && (
          <div className="text-white text-center font-bold pt-10">
            Change Your Network to {targetNetwork}!
          </div>
        )}

      {!connected ? (
        <div>
          <div className="flex flex-col items-center">
            <p className="flex justify-center px-5 text-3xl text-white font-bold text-transparent py-10 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              This app combines Aptos Token Design and InJoy Profile Module
            </p>
            <Image
              src="https://i.imgur.com/Fuw8CpQ"
              alt="work flow"
              width={800}
              height={800}
            />
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
      ) : publicRoom ? (
        <div>
          <MessageListPublic
            username={username}
            setPublicRoom={setPublicRoom}
          />
          <ChatInputPublic username={username} avatar={avatar!} />
        </div>
      ) : (
        <div className="bg-black">
          <MessageList
            username={""}
            haveToken={false}
            chatGroupToken={chatGroupToken}
            setPublicRoom={setPublicRoom}
          />
          <ChatInput username={""} avatar={avatar!} haveToken={false} />
        </div>
      )}
    </div>
  );
};

export default Home;
