import React from "react";
import "../styles/styles.css";
// import { AptosWalletProvider } from "../context/AptosWalletProvider";
import LogIn from "../components/LogIn";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <main>
        {/* <AptosWalletProvider> */}
        <LogIn />
        {/* </AptosWalletProvider> */}
      </main>
    </div>
  );
};

export default HomePage;
