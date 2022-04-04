import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./AdminScreen.css";
import { Routes, Route } from "react-router-dom";
import ImportantDatesScreen from "./ImportantDates/ImportantDatesScreen";
import AddImportantDateScreen from "./ImportantDates/AddImportantDateScreen";
import EditImportantDateScreen from "./ImportantDates/EditImportantDateScreen";
import FAQScreen from "./FAQ/FAQScreen";
import AddFAQScreen from "./FAQ/AddFAQScreen";
import EditFAQScreen from "./FAQ/EditFAQScreen";

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
          <Route
            exact
            path={`/importantdates/add`}
            element={<AddImportantDateScreen />}
          />
          <Route
            exact
            path={`/importantdates/:id`}
            element={<EditImportantDateScreen />}
          />
          <Route exact path={`/faq`} element={<FAQScreen />} />
          <Route exact path={`/faq/add`} element={<AddFAQScreen />} />
          <Route exact path={`/faq/:id`} element={<EditFAQScreen />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default AdminScreen;
