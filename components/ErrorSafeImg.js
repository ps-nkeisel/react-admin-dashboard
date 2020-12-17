import React, { useState } from "react";
import { Avatar } from "evergreen-ui";

const ErrorSafeImg = ({ src, alt, size, ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    return <Avatar src={src} name={alt} size={size} {...props} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ErrorSafeImg;
