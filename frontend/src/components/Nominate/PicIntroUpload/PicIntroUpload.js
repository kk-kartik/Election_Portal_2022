import React, { useRef } from "react";
import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Avatar from "./Avatar";
import ImageEditor from "./ImageEditor";

const PicIntroUpload = ({
  uploadImage,
  setUploadImage,
  setIntro,
  imageURL,
  setImageURL,
  intro,
  validationErrors,
  isNominationComplete,
  onIntroChange,
  tagline,
}) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [imgType, setImgType] = useState(null);
  const [imageSrcURL, setImageSrcURL] = useState(null);
  const imgInput = useRef(null);
  return (
    <div className="w-full p-3 m-6 mt-0">
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
                ref={imgInput}
                onChange={(e) => {
                  setImageSrcURL(URL.createObjectURL(e.target.files[0]));
                  // setUploadImage(e.target.files[0]);
                  //console.log(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                  setImgType(e.target.files[0].type);
                  setIsPopUp(true);
                }}
                required
              />
              <label htmlFor="select-image">
                <div class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium text-center py-2 px-6 rounded border-2">
                  Upload File
                </div>
              </label>
            </>
          )}
          <Avatar imageURL={imageURL} uploadImage={uploadImage} />
          {imageSrcURL && (
            <ImageEditor
              imageURL={imageSrcURL}
              setIsPopUp={setIsPopUp}
              setUploadImage={setUploadImage}
              setImageSrcUrl={setImageSrcURL}
              fileName={fileName}
              imgType={imgType}
              isPopUp={isPopUp}
              imgInput={imgInput}
            />
          )}
        </div>
      </div>
      {validationErrors?.image ? (
        <p className="text-red-400 text-sm">{validationErrors.image}</p>
      ) : (
        <br />
      )}
      <div className="mt-1 font-medium">Tagline:</div>
      <input
        type="text"
        placeholder="Your tagline line for the elections"
        name="tagline"
        className="w-full h-12 p-2 mt-1 border-2"
        defaultValue={tagline}
        onChange={onIntroChange}
        disabled={isNominationComplete}
        required
      ></input>
      {validationErrors?.tagline ? (
        <p className="text-red-400 text-sm">{validationErrors.tagline}</p>
      ) : (
        <br />
      )}
      <div className="mt-3 font-medium">Brief Introduction :</div>
      <textarea
        type="text"
        placeholder="Write 300 words of introduction..."
        name="about"
        className="w-full h-48 p-2 mt-1 border-2"
        defaultValue={intro}
        onChange={onIntroChange}
        disabled={isNominationComplete}
        required
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
