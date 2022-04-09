import React from "react";
import checkCircle from "./checkCircle.png";
import submit from "../../../assets/Submit.png";
import agenda from "../../../assets/Agenda.png";
import record from "../../../assets/Record.png";
import register from "../../../assets/Register.png";
import useNominate from "../../../hooks/useNominate";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Step = ({ text, imgSrc, done, link }) => (
  <Link to={`/nominate/${link}`}>
    <div className="mb-2 mr-4 p-4 w-48 h-40">
      <div className="p-3 rounded-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-300">
        <div className="text-center mb-4">
          <img src={imgSrc} alt="icon" />
        </div>
        <p className="text-center text-sm font-medium">{text}</p>
      </div>
    </div>
  </Link>
);

const StepCompleted = ({ text, imgSrc, done, link }) => (
  <div className="mb-2 mr-4 p-4 bg-blue-100 rounded-lg w-48 h-40">
    <div className="p-3 rounded-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-300 ">
      <div className="text-center mb-4">
        <img src={checkCircle} alt="icon" />
      </div>
      <p className="text-center text-sm font-medium text-indigo-600">{text}</p>
    </div>
  </div>
);

const StepList = () => {
  const { candidate, error, message, updateNomination, isComplete } =
    useNominate();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth);
  const steps = [
    {
      text: "Register for the post",
      imgSrc: register,
      done: !!candidate.id,
      link: "",
    },
    {
      text: "Write your agendas",
      imgSrc: agenda,
      done: !!candidate.agenda_text,
      link: "agendas",
    },
    {
      text: "Record your introduction video",
      imgSrc: record,
      done: !!candidate.video,
      link: "video",
    },
    {
      text: "Submit your form",
      imgSrc: submit,
      done: candidate.isComplete,
      link: "verification",
    },
  ];
  return (
    <>
      <div
        className=" rounded-md py-6 px-8 m-3 overflow-x-auto w-max"
        style={{
          boxShadow:
            "0px 0px 2px rgb(0 0 0 / 20%), 0px 2px 10px rgb(0 0 0 / 10%)",
        }}
      >
        <div className="flex justify-start items-center">
          {steps.map(({ text, imgSrc, done, link }, index) => {
            if (userData !== null && done) {
              return (
                <StepCompleted
                  key={index}
                  text={text}
                  imgSrc={imgSrc}
                  done={done}
                  link={link}
                />
              );
            } else {
              return (
                <Step
                  key={index}
                  text={text}
                  imgSrc={imgSrc}
                  done={done}
                  link={link}
                />
              );
            }
          })}
        </div>
        <div className="flex">
          <button
            class="bg-[#2B00FF] hover:bg-[#2B00AA] text-[14px] font-family-roboto text-white font-medium py-2 px-4 rounded mr-3 sm:mr-4"
            onClick={() => {
              let path = "";
              if (!userData) {
                path = "/login";
              } else if (!userData?.euser?.registration_complete) {
                path = "/register";
              } else if (userData && userData.candidates.length) {
                path = "/nominate/about";
              } else path = `/nominate/post`;
              navigate(path);
            }}
          >
            {userData && userData?.candidates.length!==0 ? "View Nomination" : "Apply Now"}
          </button>
          {/* <button class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2">
            Learn More
          </button> */}
        </div>
      </div>
    </>
  );
};

export default StepList;
