import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";

const RegisterForm = () => {
    return (
        <div>
            <form>
                <label for="name" className="font-semibold text-s text-gray-800">
                    Name:{" "}
                </label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="fname"
                    className={`${styles.input} md:w-11/12 w-full`}
                />
                <br />
                <br />
                <label for="rollno" className="font-semibold text-s text-gray-800">
                    Roll No.:{" "}
                </label>
                <br />
                <input
                    type="text"
                    id="rollno"
                    name="lname"
                    className={`${styles.input} md:w-11/12 w-full`}
                />
                <br />
                <br />
                <label for="degree" className="font-semibold text-s text-gray-800">
                    Degree:{" "}
                </label>{" "}
                <br />
                <select id="degree" className={`${styles.input} md:w-11/12 w-full`}>
                    <option value="btech">B.Tech</option>
                    <option value="mtech">M.Tech</option>
                    <option value="phd">PhD</option>
                </select>
                <br />
                <br />
                <label for="branch" className="font-semibold text-s text-gray-800">
                    Branch:{" "}
                </label>{" "}
                <br />
                <select id="branch" className={`${styles.input} md:w-11/12 w-full`}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MnC">MnC</option>
                </select>
                <br />
                <br />
                <label for="hostel" className="font-semibold text-s text-gray-800">
                    Hostel:{" "}
                </label>{" "}
                <br />
                <select id="hostel" className={`${styles.input} md:w-11/12 w-full`}>
                    <option value="Lohit">Lohit</option>
                    <option value="Dhansiri">Dhansiri</option>
                    <option value="Dihing">Dihing</option>
                </select>
            </form>

        </div>


    );
};

export default RegisterForm;
