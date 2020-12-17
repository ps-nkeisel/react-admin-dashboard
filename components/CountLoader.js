import React from "react";
import ContentLoader from "react-content-loader";

const CountLoader = () => {
  return (
    <ContentLoader primaryColor={"#ddebf7"} secondaryColor={"#b0d4f3"}>
      <rect x="0" y="0" rx="5" ry="5" width="50%" height="55" />
    </ContentLoader>
  );
};

export default CountLoader;
