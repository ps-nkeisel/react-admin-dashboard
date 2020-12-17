import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "@blueprintjs/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/pro-solid-svg-icons";

const ApiKeys = () => {
  const apiKeys = useSelector(({ session }) => ({
    apiKey: session.apiKey,
    secretKey: session.secretKey
  }));
  const [isOpen, setIsOpen] = useState(false);
  const [isApiCopyed, setApiCopyed] = useState(false);
  const [isSecretCopyed, setSecretCopyed] = useState(false);

  const apiKeyEl = React.createRef();
  const apiSecretEl = React.createRef();

  const copyToClipboard = () => {
    const el = apiKeyEl.current;
    el.select();
    document.execCommand("copy");
    setApiCopyed(true);
    setSecretCopyed(false);
  };

  const copySecretToClipboard = () => {
    const el = apiSecretEl.current;
    el.select();
    document.execCommand("copy");
    setSecretCopyed(true);
    setApiCopyed(false);
  };

  return (
    <div className="mx-wd-lg-386 w-100">
      <h3 className="tx-20 tx-spacing-1 mg-b-10 pd-b-2 mg-t-10">Your API key:</h3>
      <div className={`vu-data-box mb-4 ${isApiCopyed ? "copyed" : ""}`}>
        <input
          readOnly
          type="text"
          ref={apiKeyEl}
          value={apiKeys.apiKey ? apiKeys.apiKey : ""}
        />
        <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard()} />
      </div>
      <button
        className="btn btn-fill btn-primary mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Secret Key" : "Show Secret Key"}
      </button>
      <Collapse isOpen={isOpen}>
        <label className="bp3-label mb-1">Your Secret key:</label>
        <div className={`vu-data-box mb-4 ${isSecretCopyed ? "copyed" : ""}`}>
          <input
            readOnly
            type="text"
            ref={apiSecretEl}
            value={apiKeys.secretKey ? apiKeys.secretKey : "---"}
          />
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => copySecretToClipboard()}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default ApiKeys;
