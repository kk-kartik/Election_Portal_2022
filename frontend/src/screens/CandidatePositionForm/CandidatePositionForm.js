import React from "react";
import { Helmet } from 'react-helmet';
import styles from "./CandidatePositionForm.module.css";
import TopNav from "../../components/Home/TopNav/TopNav";
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { useNavigate } from "react-router-dom";

const CandidatePositionForm = () => {
  const formik = useFormik({
    initialValues: {
      Name: '',
    },

    validationSchema: yup.object({
      Name: yup.string()
        .required('Please Enter Name'),
    }),
  });
  return (
    <div className="">
      <Helmet>
        <style>{'body { background-color: #f8fafe; }'}</style>
      </Helmet>
      <TopNav />
      <div className={`${styles.cont} ml-2.5 mr-2.5 sm:ml-auto sm:mr-auto `}>
        <h1 className="text-4xl pb-4 mb-4"> Nominate Yourself as a Candidate </h1>
        <div>
          <form>
            <label for="name" className="font-semibold text-s text-gray-800">
              Name:{" "}
            </label>
            <br />
            <input
              type="text"
              id="Name"
              name="Name"
              {...formik.getFieldProps("Name")}
              className={` ${styles.input} md:w-11/12 w-full`}
            />
             {formik.touched.Name && formik.errors.Name ? <span style={{color:'red'}}>{formik.errors.Name}</span> : null}
            <br />
            <br />
            <label for="degree" className="font-semibold text-s text-gray-800">
              Post:{" "}
            </label>{" "}
            <br />
            <select
              id="degree"
              className={` ${styles.input} md:w-11/12 w-full`}
            >
              <option value="vp">Vice President</option>
              <option value="president">President</option>
              <option value="phd">PhD</option>
            </select>
            <br />
            <br />
          </form>
        </div>
        <br />

        <button className={styles.button2} type="submit" onClick={(e) => {
          e.preventDefault();
          if(document.getElementById("Name").value.length == 0){
            alert("Please enter name")
          }
          else window.location.href = '/election_portal/nominate';
        }}> Continue </button>

        <button className={styles.button} onClick={(e) => {
          e.preventDefault();
          window.location.href = '/election_portal';
        }} > Cancel </button>
      </div>



    </div>
  );
};

export default CandidatePositionForm;
