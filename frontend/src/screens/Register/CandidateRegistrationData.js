import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";

const CandidateRegistrationData = ({ data, setData, validationErrors }) => {
  const onChange = (e) => {
    setData((prev) => ({
      ...data,
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form>
        <label for="name" className="font-semibold text-sm text-gray-800">
          Name:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="name"
          name="name"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.name}
          onChange={onChange}
        />
        {validationErrors?.name ? (
          <p className="text-red-400 text-sm">{validationErrors.name}</p>
        ) : (
          <br />
        )}
        <label for="rollno" className="font-semibold text-sm text-gray-800">
          Roll No.:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="rollno"
          name="roll_number"
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          defaultValue={data?.roll_number != "" ? data?.roll_number : null}
          onChange={onChange}
          maxLength={9}
        />
        {validationErrors?.roll_number ? (
          <p className="text-red-400 text-sm">{validationErrors.roll_number}</p>
        ) : (
          <br />
        )}
        <label for="degree" className="font-semibold text-sm text-gray-800">
          Degree:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="degree"
          name="degree"
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          defaultValue={data?.degree != "" ? data?.degree : null}
          onChange={onChange}
        >
          <option value="">Select </option>
          <option value="U">B.Tech</option>
          <option value="P">M.Tech</option>
          <option value="P">PhD</option>
        </select>
        {validationErrors?.degree ? (
          <p className="text-red-400 text-sm">{validationErrors.degree}</p>
        ) : (
          <br />
        )}
        <label for="branch" className="font-semibold text-sm text-gray-800">
          Branch:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="branch"
          name="branch"
          defaultValue={data?.branch != "" ? data?.branch : null}
          onChange={onChange}
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
        >
          <option value="">Select</option>
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
        {validationErrors?.branch ? (
          <p className="text-red-400 text-sm">{validationErrors.branch}</p>
        ) : (
          <br />
        )}
        <label for="hostel" className="font-semibold text-sm text-gray-800">
          Hostel:
        </label>
        <br />
        <select
          required
          id="hostel"
          name="hostel"
          defaultValue={data?.hostel != "" ? data?.hostel : null}
          onChange={onChange}
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
        >
          <option value="">Select </option>
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
        {validationErrors?.hostel ? (
          <p className="text-red-400 text-sm">{validationErrors.hostel}</p>
        ) : (
          <br />
        )}
      </form>
    </div>
  );
};

export default CandidateRegistrationData;
