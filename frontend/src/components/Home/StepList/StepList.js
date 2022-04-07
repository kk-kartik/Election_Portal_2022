import React from "react";
import submit from "../../../assets/Submit.png";
import agenda from "../../../assets/Agenda.png";
import record from "../../../assets/Record.png";
import register from "../../../assets/Register.png";

const Step = ({ text, imgSrc }) => (
  <div className="mb-2 mr-4 p-4">
    <div className="p-3 rounded-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-300">
      <div className="text-center mb-4">
        <img src={imgSrc} alt="icon" />
      </div>
      <p className="text-center text-sm font-medium">{text}</p>
    </div>
  </div>
);

const steps = [
  { text: "Register for the post", imgSrc: register },
  { text: "Write your agendas", imgSrc: agenda },
  { text: "Record a video", imgSrc: record },
  { text: "Submit your form", imgSrc: submit },
];

const StepList = () => {
  return (
    <>
      <div
        className="md:w-7/12 rounded-md py-6 px-8 m-3 overflow-x-auto"
        style={{
          boxShadow:
            "0px 0px 2px rgb(0 0 0 / 20%), 0px 2px 10px rgb(0 0 0 / 10%)",
        }}
      >
        <div className="flex justify-start items-center">
          {steps.map(({ text, imgSrc }, index) => {
            return <Step key={index} text={text} imgSrc={imgSrc} />;
          })}
        </div>
        <div className="flex">
          <button class="bg-[#2B00FF] hover:bg-[#2B00AA] text-[14px] font-family-roboto text-white font-medium py-2 px-4 rounded mr-3 sm:mr-4">
            Apply Now
          </button>
          <button class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default StepList;
