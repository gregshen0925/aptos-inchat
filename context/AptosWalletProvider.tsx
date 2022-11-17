"use client";
import React, { createContext, FC } from "react";
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
import { useMemo } from "react";

type WalletProvider = {
  children: React.ReactNode;
};

export const AptosWalletProvider: FC<WalletProvider> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new BloctoWalletAdapter({
        network: WalletAdapterNetwork.Testnet,
        bloctoAppId: "Aptos InChat",
      }),
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
    <WalletProvider
      wallets={wallets}
      onError={(error: Error) => {
        console.log("wallet errors: ", error);
      }}
    >
      {children}
    </WalletProvider>
  );
};
