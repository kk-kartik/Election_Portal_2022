import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";

const WitnessDataForm = ({ data, setData, validationErrors, isFormClosed }) => {
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
          disabled={isFormClosed}
        />
        {validationErrors?.name ? (
          <p className="text-red-400 text-sm">{validationErrors.name}</p>
        ) : (
          <br />
        )}
        <label for="email" className="font-semibold text-sm text-gray-800">
          Email:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="email"
          name="email"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.email}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.email ? (
          <p className="text-red-400 text-sm">{validationErrors.email}</p>
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
          disabled={isFormClosed}
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
          disabled={isFormClosed}
        >
          <option value="">Select </option>
          <option value="BTech">B.Tech</option>
          <option value="MTech">M.Tech</option>
          <option value="PhD">PhD</option>
          <option value="Msc">MSc</option>
          <option value="Bdes">Bdes</option>
          <option value="Mdes">Mdes</option>
          <option value="Dual">Dual Degree</option>
          <option value="MA">MA</option>
          <option value="MSR">MSR</option>
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
          disabled={isFormClosed}
        >
          <option value="">Select</option>
          <option>CSE</option>
          <option>ECE</option>
          <option>ME</option>
          <option>Civil</option>
          <option>Design</option>
          <option>BSBE</option>
          <option>CL</option>
          <option>EEE</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>MNC</option>
          <option>HSS</option>
          <option>Energy</option>
          <option>Environment</option>
          <option>Nano-Tech</option>
          <option>Rural-Tech</option>
          <option>Linguistics</option>
          <option>Others</option>
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
          disabled={isFormClosed}
        >
          <option value="">Select </option>
          <option>Lohit</option>
          <option>Dhansiri</option>
          <option>Dihing</option>
          <option>Disang</option>
          <option>Dibang</option>
          <option>Manas</option>
          <option>Umiam</option>
          <option>Kapili</option>
          <option>Subansiri</option>
          <option>Kameng</option>
          <option>Barak</option>
          <option>Married Scholar Hostel</option>
          <option>Brahmaputra</option>
          <option>Siang</option>
          <option>Not Alloted</option>
        </select>
        {validationErrors?.hostel ? (
          <p className="text-red-400 text-sm">{validationErrors.hostel}</p>
        ) : (
          <br />
        )}
        <label for="cpi" className="font-semibold text-sm text-gray-800">
          Room no:{" "}
        </label>
        <input
          required
          type="text"
          id="room_no"
          name="room_no"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.room_no}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.room_no ? (
          <p className="text-red-400 text-sm">{validationErrors.room_no}</p>
        ) : (
          <br />
        )}
        <label for="cpi" className="font-semibold text-sm text-gray-800">
          Cpi:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="cpi"
          name="cpi"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.cpi}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.cpi ? (
          <p className="text-red-400 text-sm">{validationErrors.cpi}</p>
        ) : (
          <br />
        )}
        <label for="cpi" className="font-semibold text-sm text-gray-800">
          Semester:{" "}
        </label>
        <input
          required
          type="text"
          id="semester"
          name="semester"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.semester}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.semester ? (
          <p className="text-red-400 text-sm">{validationErrors.semester}</p>
        ) : (
          <br />
        )}
        <label for="contact_no" className="font-semibold text-sm text-gray-800">
          Contact No:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="contact_no"
          name="contact_no"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.contact_no}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.contact_no ? (
          <p className="text-red-400 text-sm">{validationErrors.contact_no}</p>
        ) : (
          <br />
        )}
      </form>
    </div>
  );
};

export default WitnessDataForm;
