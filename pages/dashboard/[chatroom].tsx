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
import {
  client,
  tokenClient,
  MODULE_ADDRESS,
  CREATOR_ADDRESS,
  COLLECTION_NAME,
  GROUP_NAME,
} from "../../utils/aptosClient";

type Props = {};

const Home = (props: Props) => {
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [transferModalOn, setTransferModalOn] = useState<boolean>(false);
  const [inboxModalOn, setInboxModalOn] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<number>(-1);
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
    const getTokenForAccount = async () => {
      if (!account || !account.address) return;
      await tokenClient
        .getTokenForAccount(account.address, {
          token_data_id: {
            creator: CREATOR_ADDRESS,
            collection: COLLECTION_NAME,
            name: GROUP_NAME,
          },
          property_version: "0",
        })
        .then((balance) => {
          setTokenBalance(parseInt(balance.amount));
        })
        .catch(() => {
          setTokenBalance(0);
        });
    };
    getTokenForAccount();
  }, [account]);

  useEffect(() => {
    // check if connected
    if (
      !connected ||
      !address ||
      !(network?.name?.toString() === "Testnet") ||
      tokenBalance < 0
    ) {
      return;
    }
    setLoading(true);
    // check if registered
    const getUserName = async () => {
      await client
        .getAccountResource(address, `${MODULE_ADDRESS}::profile::Profile`)
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
  }, [connected, address, network, tokenBalance]);

  return (
    <div className="bg-black min-h-screen">
      <title>Greg's Room</title>
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
      ) : tokenBalance <= 0 ? (
        <p className="flex justify-center px-5 text-3xl text-white font-bold">
          No permission
        </p>
      ) : (
        <div className="bg-black min-h-screen">
          <MessageList
            username={username}
            haveToken={tokenBalance > 0}
            setPublicRoom={undefined}
            publicRoom={undefined}
          />
          <ChatInput
            username={username}
            avatar={avatar!}
            haveToken={tokenBalance > 0}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
