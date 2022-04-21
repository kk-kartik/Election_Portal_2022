import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";
import * as yup from "yup";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth);
  const [validationErrors, setValidationErrors] = useState(null);
  let aboutSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter the name")
      .min(3, "Please enter a valid name"),
    degree: yup.string().required(),
    branch: yup.string().required(),
    hostel: yup.string().required(),
    roll_number: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Roll number should have atleast 9 digits")
      .max(12, "Roll number shouldn't be more than 12 digits")
      .typeError("Please enter digits only"),
  });
  let navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [rollNo, setRollNo] = useState(0);
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      name: data.get("name"),
      roll_number: data.get("roll_number"),
      degree: data.get("degree"),
      branch: data.get("branch"),
      hostel: data.get("hostel"),
    };

    try {
      await aboutSchema.validate(payload, { abortEarly: false });
    } catch (err) {
      if (err.inner) {
        setValidationErrors((prev) => {
          const newError = {};
          err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
          return newError;
        });
      }
      return;
    }
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
          defaultValue={userData?.first_name || userData?.euser?.name}
          className={`${styles.input} md:w-11/12 w-full`}
        />
        {validationErrors?.name ? (
          <p className="text-red-400 text-sm">{validationErrors.name}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
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
        {validationErrors?.roll_number ? (
          <p className="text-red-400 text-sm">{validationErrors.roll_number}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="degree" className="font-semibold text-s text-gray-800">
          Degree:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="degree"
          name="degree"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue=""
        >
          <option value="">Select </option>
          <option value="B">B.Tech</option>
          <option value="M">M.Tech</option>
          <option value="P">PhD</option>
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
          <>
            <br />
            <br />
          </>
        )}
        <label for="branch" className="font-semibold text-s text-gray-800">
          Branch:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="branch"
          name="branch"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue=""
        >
          <option value="">Select </option>
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
          <>
            <br />
            <br />
          </>
        )}
        <label for="hostel" className="font-semibold text-s text-gray-800">
          Hostel:
        </label>
        <br />
        <select
          required
          id="hostel"
          name="hostel"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue=""
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
          <>
            <br />
            <br />
          </>
        )}
        <button type="submit" className={`${styles.button} mt-3`}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
