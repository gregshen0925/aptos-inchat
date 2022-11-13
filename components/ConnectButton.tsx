"use client";

import React from "react";

interface Props {
  setConnectModalOn: Function;
}

const ConnectButton = ({ setConnectModalOn }: Props) => {
  const handleOpenModel = () => {
    setConnectModalOn(true);
  };
  return (
    <div className="button-container-1">
      <span className="mas">Connect</span>
      <button onClick={handleOpenModel} type="button" name="Hover">
        Connect
      </button>
    </div>
  );
};

export default ConnectButton;
