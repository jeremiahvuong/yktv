import React from "react";

interface Props {
  connectWallet: () => void;
}

const ConnectWallet: React.FC<Props> = ({ connectWallet }) => {
  return (
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
};

export default ConnectWallet;
