import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faShareAlt,
  faSmile,
  faDollarSign
} from "@fortawesome/pro-solid-svg-icons";

const Loader = () => (
  <div className="loader">
    <div className="loader__list">
      <div className="loader__item">
        <FontAwesomeIcon size="lg" icon={faComments}></FontAwesomeIcon>
      </div>
      <div className="loader__item">
        <FontAwesomeIcon size="lg" icon={faSmile}></FontAwesomeIcon>
      </div>
      <div className="loader__item">
        <FontAwesomeIcon size="lg" icon={faShareAlt}></FontAwesomeIcon>
      </div>
      <div className="loader__item">
        <FontAwesomeIcon size="lg" icon={faDollarSign}></FontAwesomeIcon>
      </div>
    </div>
  </div>
);

export default Loader;
