import React from "react";

// bandaid ts fix
declare var window: any;

interface Props {
  domain: string;
  setDomain: (arg0: string) => void;
  recordTwitter: string;
  setRecordTwitter: (arg0: string) => void;
  mintDomain: () => void;
  network: string;
  editing: any;
  loading: any;
  updateDomain: any;
  setEditing: any;
}

const InputForm: React.FC<Props> = ({
  domain,
  setDomain,
  recordTwitter,
  setRecordTwitter,
  mintDomain,
  network,
  editing,
  loading,
  updateDomain,
  setEditing,
}) => {
  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  // If not on Polygon Mumbai Testnet, render the switch button
  if (network !== "Polygon Mumbai Testnet") {
    return (
      <div className="connect-wallet-container">
        <h2>Please switch to Polygon Mumbai Testnet</h2>
        {/* This button will call our switch network function */}
        <button className="cta-button mint-button" onClick={switchNetwork}>
          Click here to switch
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="first-row">
        <input
          type="text"
          value={domain}
          placeholder="domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <p className="tld">.yktv</p>
      </div>
      <input
        type="text"
        value={recordTwitter}
        placeholder="twitter handle"
        onChange={(e) => setRecordTwitter(e.target.value)}
      />
      {editing ? (
        <div className="button-container">
          <button
            className="cta-button mint-button"
            disabled={loading}
            onClick={updateDomain}
          >
            Set record
          </button>
          <button
            className="cta-button mint-button"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        // If editing is not true, the mint button will be returned instead
        <button
          className="cta-button mint-button"
          disabled={loading}
          onClick={mintDomain}
        >
          Mint
        </button>
      )}
    </div>
  );
};

export default InputForm;
