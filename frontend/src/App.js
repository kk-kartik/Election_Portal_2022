import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL } from "./config/constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import CandidateNominateScreen from "./screens/candidatenominationscreen/CandidateNominateScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import CandidatePositionForm from "./screens/CandidatePositionForm/CandidatePositionForm";

function App() {
  return (
    <BrowserRouter basename={BASEURL}>
      <Routes>
        <Route path="/*" exact element={<PreElectionScreen />} />
        <Route path="/register" exact element={<RegisterScreen />} />
        <Route path="/admin/*" exact element={<AdminScreen />} />
        <Route path="/nominate/*" exact element={<CandidateNominateScreen />} />
        <Route path="/nominate/post" exact element={<CandidatePositionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
