"use client"
import React from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import '../styles/styles.css'
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
    BloctoWalletAdapter
  } from '@manahippo/aptos-wallet-adapter';
  import { useMemo } from 'react';


type Props = {}

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
        <WalletProvider
        wallets={wallets}
        onError={(error: Error) => {
          console.log('wallet errors: ', error);
        }}>
        <main>
            <MessageList />
            <ChatInput />
        </main>
        </WalletProvider>

        

    )
}

export default HomePage