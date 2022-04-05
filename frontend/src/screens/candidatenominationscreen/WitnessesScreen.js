import React from "react";
import RegisterForm from "../Register/RegisterForm";

const WitnessesScreen = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-6">
        <div className="font-semibold text-m text-gray-800">Proposed by :</div>
        <br/>
        <RegisterForm />
        <br />
        <form>
          <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input accept="image/*" type="file" id="select-image" />
        </form>
      </div>

      <div className="p-6">
        <div className="font-semibold text-m text-gray-800">Seconded by :</div>
        <br/>
        <RegisterForm />
        <br />
        <form>
          <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input accept="image/*" type="file" id="select-image" />
        </form>
      </div>
    </div>
  );
};
export default WitnessesScreen;
