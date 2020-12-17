import React, { useState } from "react";
import JavascriptInstructions from "./JavascriptInstructions";
import WordpressInstructions from "./WordpressInstructions";
import { faWordpress, faJsSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SetupGuide = () => {
  const [platform, setPlatform] = useState("");
  return (
    <div>
      <h3 className="tx-20 tx-spacing-1 mg-y-25">Choose your platform:</h3>
      <div className="platform__list d-flex w-100">
        <div className="platform__item">
          <button
            className={
              "platform__button d-flex align-items-center tx-color-05 rounded-4" +
              (platform === "Wordpress" ? " platform__button--current" : "")
            }
            onClick={() => setPlatform("Wordpress")}
          >
            <FontAwesomeIcon
              className="platform__icon"
              icon={faWordpress}
            ></FontAwesomeIcon>
            <p className="text-uppercase tx-10 mb-0">Wordpress</p>
          </button>
        </div>
        <div className="platform__item">
          <button
            className={
              "platform__button d-flex align-items-center tx-color-05 rounded-4" +
              (platform === "Javascript" ? " platform__button--current" : "")
            }
            onClick={() => setPlatform("Javascript")}
          >
            <FontAwesomeIcon
              className="platform__icon"
              icon={faJsSquare}
            ></FontAwesomeIcon>
            <p className="text-uppercase tx-10 mb-0">Javascript</p>
          </button>
        </div>
      </div>
      {platform === "Javascript" && <JavascriptInstructions />}
      {platform === "Wordpress" && <WordpressInstructions />}
    </div>
  );
};

export default SetupGuide;
