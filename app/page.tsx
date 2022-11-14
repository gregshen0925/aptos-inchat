import React from "react";
import "../styles/styles.css";
// import { AptosWalletProvider } from "../context/AptosWalletProvider";
import Login from "../components/LogIn";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <main>
        {/* <AptosWalletProvider> */}
        <Login />
        {/* </AptosWalletProvider> */}
      </main>
    </div>
  );
};

export default HomePage;
