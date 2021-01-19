import React from "react";


const FeedBack = ({ status, message }) => {
  return (
    <div className={`FeedBack ${status}`}>
      <p>{message}</p>
    </div>
  );
};

export default FeedBack;
