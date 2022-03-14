import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./AdminScreen.css";
import { Routes, Route } from "react-router-dom";
import FormScreen from "./FormScreen/FormScreen";
import ImportantDatesScreen from "./ImportantDates/ImportantDatesScreen";

const AdminScreen = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Sidebar>
        <Routes>
          <Route
            exact
            path={`/importantdates`}
            element={<ImportantDatesScreen />}
          />
          <Route exact path={`/importantdates/add`} element={<FormScreen />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default AdminScreen;
