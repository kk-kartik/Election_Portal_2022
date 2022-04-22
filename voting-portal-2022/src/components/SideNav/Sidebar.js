import React, { useState } from "react";
import SubMenu from "./SubMenu";
import gymkhana from "../../assets/gymkhana.png";
import styles from "./Sidebar.module.css";
import SubmitVotesModal from "../SubmitVotesModal/SubmitVotesModal";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const votes = useSelector((store) => store.votes);
  return (
    <div
      className="shadow-lg rounded-2xl fixed top-0 left-0 h-screen overflow-auto w-1/5 pr-1 text-sm"
      style={{
        backgroundColor: "#F9F9F9",
      }}
    >
      <div className="flex justify-center items-center m-3 mb-5">
        <img src={gymkhana} alt="hi" />
        <div className="font-semibold p-3 text-xl">Gymkhana Elections 2022</div>
      </div>

      {props.posts.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}

      <div className="flex justify-center items-center my-6 mb-10">
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          {" "}
          Seal and Submit
        </button>
        {modalOpen && (
          <SubmitVotesModal setModalOpen={setModalOpen} votes={votes} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
