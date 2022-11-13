"use client";
import React, { useMemo } from "react";
import "../styles/styles.css";
import LogIn from "../components/LogIn";
import {
  WalletAdapterNetwork,
  MartianWalletAdapter,
  AptosWalletAdapter,
  RiseWalletAdapter,
  FewchaWalletAdapter,
  WalletProvider,
  PontemWalletAdapter,
  SpikaWalletAdapter,
  BitkeepWalletAdapter,
  BloctoWalletAdapter,
  WalletProviderProps,
} from "@manahippo/aptos-wallet-adapter";

type Props = {};

const HomePage = (props: Props) => {
  const wallets = useMemo(
    () => [
      //   new BloctoWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
      new MartianWalletAdapter(),
      new AptosWalletAdapter(),
      new RiseWalletAdapter(),
      new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
      new SpikaWalletAdapter(),
      new BitkeepWalletAdapter(),
    ],
    []
  );
  return (
    <main>
      <WalletProvider
        wallets={wallets}
        onError={(error: Error) => {
          console.log("wallet errors: ", error);
        }}
      >
        <LogIn />
      </WalletProvider>
    </main>
  );
};

export default HomePage;
