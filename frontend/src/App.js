import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL, SET_CANDIDATE_DATA } from "./constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import CandidateNominateScreen from "./screens/candidatenominationscreen/CandidateNominateScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import CandidatePositionForm from "./screens/CandidatePositionForm/CandidatePositionForm";
import ElectionScreen from "./screens/election/ElectionScreen";
import TopNav from "./components/Home/TopNav/TopNav";
import CandidateNominationScreen from "./screens/pre_election/CandidateNominationScreen";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/auth";
import useAuthCheck from "./hooks/useAuthCheck";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegistrationRoute from "./custom-routes/RegistrationRoute";
import NominationRoute from "./custom-routes/NominationRoutes";

function Pre() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/*" exact element={<PreElectionScreen />} />
        <Route
          path="/register"
          exact
          element={
            <RegistrationRoute>
              <RegisterScreen />
            </RegistrationRoute>
          }
        />
        <Route
          path="/nominate/*"
          exact
          element={
            <NominationRoute>
              <CandidateNominateScreen />
            </NominationRoute>
          }
        />
        <Route path="/login" exact element={<LoginScreen />} />
        <Route
          path="/nominate/post"
          exact
          element={<CandidatePositionForm />}
        />
        <Route
          path="/candidate/:name"
          exact
          element={<CandidateNominationScreen />}
        />
      </Routes>
    </div>
  );
}

function App() {
  const userData = useSelector((store) => store.auth);
  const candidate = useSelector((store) => store.candidate);
  const dispatch = useDispatch();
  const isLoggedIn = useAuthCheck();

  console.log("APP ", isLoggedIn);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    console.log(userData);
    if (
      userData &&
      Object.keys(candidate).length == 0 &&
      userData.candidates.length != 0
    ) {
      console.log("hi");
      dispatch({ type: SET_CANDIDATE_DATA, data: userData.candidates[0] });
    }
  }, [userData]);
  return (
    <BrowserRouter basename={BASEURL}>
      <Routes>
        <Route path="/*" exact element={<Pre />} />
        <Route path="/election/*" exact element={<ElectionScreen />} />
        <Route path="/admin/*" exact element={<AdminScreen />} />
        <Route path="/login" exact element={<LoginScreen />} />
        {/* Route of the VOTING PORTAL */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
