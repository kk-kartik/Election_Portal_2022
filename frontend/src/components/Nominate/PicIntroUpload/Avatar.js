import React from "react";

export default function Avatar({ imageURL }) {
  return (
    <div className="flex-col justify-center align-center items-center">
      <div className="mx-10 my-3">
        <img src={imageURL} alt="img" style={{ maxWidth: "300px" }} />
      </div>
    </div>
  );
}
