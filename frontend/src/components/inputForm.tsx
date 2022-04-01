import React, { useState } from "react";

const InputForm: React.FC = () => {
  const [inputDomain, setInputDomain] = useState("");
  const [recordTwitter, setRecordTwitter] = useState("");

  return (
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
          disabled={undefined}
          onClick={undefined}
        >
          Mint
        </button>
        <button
          className="cta-button mint-button"
          disabled={undefined}
          onClick={undefined}
        >
          Set data
        </button>
      </div>
    </div>
  );
};

export default InputForm;
