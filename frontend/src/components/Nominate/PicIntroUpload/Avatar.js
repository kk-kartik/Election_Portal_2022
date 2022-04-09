import React from "react";

export default function Avatar({ imageURL }) {
  return (
    <div className="flex-col justify-center align-center items-center">
      <div className="mx-10 my-3">
        <img class="w-auto h-64" src={imageURL} alt="img" />
      </div>
    </div>
  );
}
