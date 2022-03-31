import { useEffect, useState } from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";

const App = () => {
  const { ethereum } = window;

  const [currentAccount, setCurrentAccount] = useState("");
  const [inputDomain, setInputDomain] = useState("");
  const [recordTwitter, setRecordTwitter] = useState("");

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

  const renderNoConnection = (
    <div className="connect-wallet-container">
      <img
        src="https://c.tenor.com/4IOr7C2BdbMAAAAd/kitagawa-kitagawa-marin.gif"
        alt="Marin GIF"
      />
      <button
        onClick={connectWallet}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    </div>
  );

  const renderInputForm = (
    <div className="form-container">
      <div className="first-row">
        <input
          type="text"
          value={inputDomain}
          placeholder="domain"
          onChange={(e) => setInputDomain(e.target.value)}
        />
        <p className="tld">.yktv</p>
      </div>
      <input
        type="text"
        value={recordTwitter}
        placeholder="twitter handle"
        onChange={(e) => setRecordTwitter(e.target.value)}
      />
      <div className="button-container">
        <button
          className="cta-button mint-button"
          disabled={null}
          onClick={null}
        >
          Mint
        </button>
        <button
          className="cta-button mint-button"
          disabled={null}
          onClick={null}
        >
          Set data
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    checkWalletConnection();
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
        {currentAccount ? renderInputForm : renderNoConnection}
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
