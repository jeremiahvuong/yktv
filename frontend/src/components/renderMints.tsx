import React from "react";

interface Props {
  setEditing: (arg0: boolean) => void;
  setDomain: (arg0: string) => void;
  currentAccount: string;
  mints: any;
}

const RenderMints: React.FC<Props> = ({
  setEditing,
  setDomain,
  currentAccount,
  mints,
}) => {
  const editRecord = (name: string) => {
    console.log("Editing record for", name);
    setEditing(true);
    setDomain(name);
  };

  if (currentAccount && mints.length > 0) {
    return (
      <div className="mint-container">
        <p className="subtitle"> Recently minted domains!</p>
        <div className="mint-list">
          {mints.map((mint: any, index: number) => {
            return (
              <div className="mint-item" key={index}>
                <div className="mint-row">
                  <a
                    className="link"
                    href={`https://testnets.opensea.io/assets/mumbai/0x4D3Bd02d5D358af69b5Ef5100521f78a4D4ee66D/${mint.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="underlined">
                      {" "}
                      {mint.name}
                      {".yktv"}{" "}
                    </p>
                  </a>
                  {/* If mint.owner is currentAccount, add an "edit" button*/}
                  {mint.owner.toLowerCase() === currentAccount.toLowerCase() ? (
                    <button
                      className="edit-button"
                      onClick={() => editRecord(mint.name)}
                    >
                      <img
                        className="edit-icon"
                        src="https://img.icons8.com/metro/26/000000/pencil.png"
                        alt="Edit button"
                      />
                    </button>
                  ) : null}
                </div>
                <p> {mint.record} </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <p>Nothing</p>;
  }
};

export default RenderMints;
