import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./AdminScreen.css";

const AdminScreen = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Sidebar>
        <div className="h-4/5 flex justify-center items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              Welcome to Election Portal's Admin Panel.
            </h1>
            <p className="text-xl sm:text-2xl text-center mt-3">
              Please{" "}
              <a href="#" className="text-blue-500 underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default AdminScreen;
