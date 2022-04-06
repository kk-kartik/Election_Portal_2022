import React from "react";
import submit from "../../../assets/Submit.png";
import agenda from "../../../assets/Agenda.png";
import record from "../../../assets/Record.png";
import register from "../../../assets/Register.png";

const StepList = () => {
  return (
    <>
      <div className="w-8/12 p-6 shadow-lg m-3 overflow-x-auto">
        <div className="m-3 grid grid-rows-2 grid-flow-col gap-6 place-items-center	">
          <div className="text-center mx-auto	col-span-9 md:col-span-6">
            <img src={register} alt="hello" />
          </div>
          <div className="text-center leading-5 col-span-9 md:col-span-6">
            Register for the post
          </div>
          <div className="text-center mx-auto	col-span-9 md:col-span-6">
            <img src={agenda} alt="hello" />
          </div>
          <div className="text-center leading-5 col-span-9 md:col-span-6">
            Write your agendas
          </div>
          <div className="text-center mx-auto	col-span-9 md:col-span-6">
            <img src={record} alt="hello" />
          </div>

          <div className="text-center leading-5 col-span-9 md:col-span-6">
            Record a video
          </div>
          <div className="text-center mx-auto	col-span-9 md:col-span-6">
            <img src={submit} alt="hello" />
          </div>
          <div className="text-center leading-5 col-span-9 md:col-span-6">
            Submit your form
          </div>
          <div className="col-span-9 md:col-span-8"></div>
        </div>
        <div className="gap-3 flex">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Apply Now
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default StepList;
