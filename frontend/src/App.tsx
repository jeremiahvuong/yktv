import React, { useEffect, useState } from "react";
import "./styles/App.css";
//@ts-ignore
import twitterLogo from "./assets/twitter-logo.svg";

import InputForm from "./components/inputForm";
import ConnectWallet from "./components/connectWallet";

const App: React.FC = () => {
  const { ethereum }: any = window;

  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    if (!ethereum) {
      return alert("MetaMask not found!\nGet it @ https://metamask.io");
    }

    const requestAccounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(requestAccounts[0]);
  };

  const checkWalletConnection = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🐱‍👤 YKTV Name Service</p>
              <p className="subtitle">crazyyyy....</p>
            </div>
          </header>
        </div>
        {currentAccount ? (
          <InputForm />
        ) : (
          <ConnectWallet connectWallet={connectWallet} />
        )}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href="https://twitter.com/sparcjv"
            target="_blank"
            rel="noreferrer"
          >{`made with <3 by @sparcjv`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
