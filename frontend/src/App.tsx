import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./styles/App.css";
//@ts-ignore
import twitterLogo from "./assets/twitter-logo.svg";
import InputForm from "./components/inputForm";
import ConnectWallet from "./components/connectWallet";
import RenderMints from "./components/renderMints";
//@ts-ignore
import contractAbi from "./utils/contractAbi.json";
//@ts-ignore
import polygonLogo from "./assets/polygonlogo.png";
//@ts-ignore
import ethLogo from "./assets/ethlogo.png";
import { networks } from "./utils/networks";

const contractAddress = "0x970230905AF1Ee7b01eE6B8eC8093e9D7E15B81c";

const App: React.FC = () => {
  // functionality
  const [network, setNetwork] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const { ethereum }: any = window;

  // nft interaction
  const [domain, setDomain] = useState("");
  const [recordTwitter, setRecordTwitter] = useState("");

  // change var state
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // display domains
  const [mints, setMints] = useState<any[]>([]);

  const fetchMints = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );

        const names = await contract.getAllNames();

        // For each name, get the record and the address
        const mintRecords = await Promise.all(
          names.map(async (name: any) => {
            const mintRecord = await contract.records(name);
            const owner = await contract.domains(name);
            return {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };
          })
        );

        console.log("MINTS FETCHED ", mintRecords);
        setMints(mintRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintDomain = async () => {
    if (!domain) {
      return;
    }

    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long!");
      return;
    }

    /* 3 = 0.5
     * 4 = 0.3
     * 5+ = 0.1 */
    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log(`Minting domain ${domain} with price ${price}`);

    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );

        console.log("Popping up wallet!");

        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });

        const recipt = await tx.wait();

        // txn success check
        if (recipt.status === 1) {
          console.log(
            `Domain minted! https://mumbai.polygonscan.com/tx/${tx.hash}`
          );

          tx = await contract.setRecord(domain, recordTwitter);
          await tx.wait();

          console.log(
            `Twitter set! https://mumbai.polygonscan.com/tx/${tx.hash}`
          );

          setTimeout(() => {
            fetchMints();
          }, 2000);

          setRecordTwitter("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDomain = async () => {
    if (!recordTwitter || !domain) {
      return;
    }
    setLoading(true);
    console.log("Updating domain", domain, "with record", recordTwitter);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );

        let tx = await contract.setRecord(domain, recordTwitter);
        await tx.wait();
        console.log("Record set https://mumbai.polygonscan.com/tx/" + tx.hash);

        fetchMints();
        setRecordTwitter("");
        setDomain("");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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

    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    // Reload the page when they change networks
    function handleChainChanged(_chainId: any) {
      window.location.reload();
    }
  };

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This will run any time currentAccount or network are changed
  useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
      fetchMints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, network]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🐱‍👤 YKTV Name Service</p>
              <p className="subtitle">crazyyyy....</p>
            </div>
            <div className="right">
              <img
                alt="Network logo"
                className="logo"
                src={network.includes("Polygon") ? polygonLogo : ethLogo}
              />
              {currentAccount ? (
                <p>
                  {currentAccount.slice(0, 6)}...
                  {currentAccount.slice(-4)}
                </p>
              ) : (
                <p> Not connected </p>
              )}
            </div>
          </header>
        </div>
        {currentAccount ? (
          <InputForm
            domain={domain}
            setDomain={setDomain}
            recordTwitter={recordTwitter}
            setRecordTwitter={setRecordTwitter}
            mintDomain={mintDomain}
            network={network}
            editing={editing}
            loading={loading}
            updateDomain={updateDomain}
            setEditing={setEditing}
          />
        ) : (
          <ConnectWallet connectWallet={connectWallet} />
        )}
        {mints && (
          <RenderMints
            setEditing={setEditing}
            setDomain={setDomain}
            currentAccount={currentAccount}
            mints={mints}
          />
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
