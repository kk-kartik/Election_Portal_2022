import React from "react";
import { AgendaSVG } from "./AgendaSVG";

const NameTag = () => {
  return (
    <>
      <div className="mr-10 mt-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-600 font-semibold text-lg">
            Contesting for Vice President
          </div>
          <div className="flex space-x-2  hidden sm:block">
            <button className="px-5 py-2.5 border-2 rounded ">
              Share this profile
            </button>
            <button className="px-5 py-2.5 border-2 rounded bg-pink-500 text-white">
              <div className="flex items-center">
                Agenda
                <AgendaSVG />
              </div>
            </button>
          </div>
        </div>
        <div className="font-bold text-5xl text-gray-800">Albert Fores</div>
        <div className="text-rose-500 ">
          B.Tech, Electronics and Communication Engineering - 2023
        </div>
      </div>
    </>
  );
};

export default NameTag;
