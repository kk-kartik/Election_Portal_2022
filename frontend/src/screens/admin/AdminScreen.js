import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./AdminScreen.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ImportantDatesScreen from "./ImportantDates/ImportantDatesScreen";
import AddImportantDateScreen from "./ImportantDates/AddImportantDateScreen";
import EditImportantDateScreen from "./ImportantDates/EditImportantDateScreen";
import FAQScreen from "./FAQ/FAQScreen";
import AddFAQScreen from "./FAQ/AddFAQScreen";
import EditFAQScreen from "./FAQ/EditFAQScreen";
import DebatesScreen from "./Debates/DebateScreen";
import AddDebateScreen from "./Debates/AddDebateScreen";
import EditDebateScreen from "./Debates/EditDebateScreen";
import CandidatesScreen from "./Candidates/CandidateScreen";

const AdminScreen = () => {
  let loginBool = useSelector((store) => store.auth);
  console.log("timepass", { loginBool });
  return (
    <div className="bg-gray-100 font-family-karla flex">
      {loginBool ? (
        <Sidebar>
          {loginBool?.is_staff ? (
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
              <Route exact path={`/debates`} element={<DebatesScreen />} />
              <Route
                exact
                path={`/debates/add`}
                element={<AddDebateScreen />}
              />
              <Route
                exact
                path={`/debates/:id`}
                element={<EditDebateScreen />}
              />
              <Route
                exact
                path={`/candidates`}
                element={<CandidatesScreen />}
              />

              <Route exact path={`/faq`} element={<FAQScreen />} />
              <Route exact path={`/faq/add`} element={<AddFAQScreen />} />
              <Route exact path={`/faq/:id`} element={<EditFAQScreen />} />
            </Routes>
          ) : (
            <div className="h-4/5 flex justify-center items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                  You are Not Authorized.
                </h1>
              </div>
            </div>
          )}
        </Sidebar>
      ) : (
        <div className="h-4/5 flex justify-center items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              Welcome to Election Portal's Admin Panel.
            </h1>
            <p className="text-xl sm:text-2xl text-center mt-3">
              Please{" "}
              {/* <a href={LOGIN_URL} className="text-blue-500 underline">
              Login
            </a> */}
              <Link to="/login">
                <button className="border-2 py-1 px-4 rounded-md text-sm font-medium">
                  Login
                </button>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScreen;
