import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/auth";

const RegisterForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [rollNo, setRollNo] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      name: data.get("name"),
      roll_number: data.get("roll_number"),
      degree: data.get("degree"),
      branch: data.get("branch"),
      hostel: data.get("hostel"),
    };
    const regSubmit = async () => {
      try {
        const res = await userRegistration(payload);
        if (res.status === 200) {
          dispatch(getUser());
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };
    regSubmit();
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <label for="name" className="font-semibold text-s text-gray-800">
          Name:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="name"
          name="name"
          className={`${styles.input} md:w-11/12 w-full`}
        />
        <br />
        <br />
        <label for="rollno" className="font-semibold text-s text-gray-800">
          Roll No.:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="rollno"
          name="roll_number"
          className={`${styles.input} md:w-11/12 w-full`}
        />
        <br />
        <br />
        <label for="degree" className="font-semibold text-s text-gray-800">
          Degree:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="degree"
          name="degree"
          className={`${styles.input} md:w-11/12 w-full`}
        >
          <option value="U">B.Tech</option>
          <option value="P">M.Tech</option>
          <option value="P">PhD</option>
        </select>
        <br />
        <br />
        <label for="branch" className="font-semibold text-s text-gray-800">
          Branch:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="branch"
          name="branch"
          className={`${styles.input} md:w-11/12 w-full`}
        >
          <option value="01">CSE</option>
          <option value="02">ECE</option>
          <option value="03">ME</option>
          <option value="04">Civil</option>
          <option value="05">Design</option>
          <option value="06">BSBE</option>
          <option value="07">CL</option>
          <option value="08">EEE</option>
          <option value="21">Physics</option>
          <option value="22">Chemistry</option>
          <option value="23">MNC</option>
          <option value="41">HSS</option>
          <option value="51">Energy</option>
          <option value="52">Environment</option>
          <option value="53">Nano-Tech</option>
          <option value="54">Rural-Tech</option>
          <option value="55">Linguistics</option>
          <option value="61">Others</option>
        </select>
        <br />
        <br />
        <label for="hostel" className="font-semibold text-s text-gray-800">
          Hostel:
        </label>
        <br />
        <select
          required
          id="hostel"
          name="hostel"
          className={`${styles.input} md:w-11/12 w-full`}
        >
          <option value="lohit">Lohit</option>
          <option value="dhansiri">Dhansiri</option>
          <option value="dihing">Dihing</option>
          <option value="disang">Disang</option>
          <option value="dibang">Dibang</option>
          <option value="manas">Manas</option>
          <option value="umiam">Umiam</option>
          <option value="kapili">Kapili</option>
          <option value="subansiri">Subansiri</option>
          <option value="kameng">Kameng</option>
          <option value="barak">Barak</option>
          <option value="msh">Married Scholar Hostel</option>
          <option value="brahmaputra">Brahmaputra</option>
          <option value="siang">Siang</option>
          <option value="not-alloted">Not Alloted</option>
        </select>
        <button type="submit" className={`${styles.button} mt-3`}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
