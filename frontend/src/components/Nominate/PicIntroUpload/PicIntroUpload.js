import React from "react";
import { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const PicIntroUpload = ({
  uploadImage,
  setUploadImage,
  setIntro,
  imageURL,
  setImageURL,
  intro,
  validationErrors,
  isNominationComplete,
}) => {
  const [crop, setCrop] = useState({ aspect: 4 / 3 });
  return (
    <div className="p-3 m-6 mt-0">
      <div className="font-medium">Profile Pic : </div>
      <div
        className="flex justify-center align-center items-center border-2 p-3"
        style={({ height: "fit-content" }, { "min-height": "12rem" })}
      >
        <div>
          {!isNominationComplete && (
            <>
              <div className="mb-3 text-center">
                {" "}
                Upload your profile picture here
              </div>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setUploadImage(e.target.files[0])}
                required
              />
              <label htmlFor="select-image">
                <div class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium text-center py-2 px-6 rounded border-2">
                  Upload File
                </div>
              </label>
            </>
          )}
          {imageURL && (
            <>
              <div className="flex-col justify-center align-center items-center">
                {/* <div className="flex-col items-stretch">
                  <button
                    className="mt-3 mb-2 px-4 hover:bg-gray-400 rounded text-center border-2 border-gray-700 mx-10 font-bold"
                    onClick={(e) => setUploadImage(null)}
                  >
                    Click to remove
                  </button>
                </div> */}
                <div className="mx-10 my-3">
                  {/* <img src={imageURL} alt="" className="h-24" /> */}
                  <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                    <img
                      src={imageURL}
                      style={{
                        height: "12rem",
                      }}
                    />
                  </ReactCrop>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-3 font-medium">Brief Introduction :</div>
      <textarea
        type="text"
        placeholder="Write 300 words of introduction..."
        name="intro"
        className="w-full h-48 p-2 mt-1 border-2"
        defaultValue={intro}
        onChange={(e) => setIntro(e.target.value)}
        required
        disabled={isNominationComplete}
      ></textarea>
      {validationErrors?.about ? (
        <p className="text-red-400 text-sm">{validationErrors.about}</p>
      ) : (
        <br />
      )}
    </div>
  );
};

export default PicIntroUpload;
