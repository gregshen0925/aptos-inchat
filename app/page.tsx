"use client";
import React from "react";
import "../styles/styles.css";
import { AptosWalletProvider } from "../context/AptosWalletProvider";
import LogIn from "../components/Login";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main>
      <AptosWalletProvider>
        <LogIn />
      </AptosWalletProvider>
    </main>
  );
};

export default HomePage;
