import React from "react";
import "../styles/styles.css";
import LogIn from "../components/LogIn";
import "../styles/globals.css";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <main>
        <LogIn />
      </main>
    </div>
  );
};

export default HomePage;
