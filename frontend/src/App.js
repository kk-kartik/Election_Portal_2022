import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL } from "./config/constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import CandidateNominateScreen from "./screens/candidatenominationscreen/CandidateNominateScreen";

function App() {
  return (
    <BrowserRouter basename={BASEURL}>
      <Routes>
        <Route path="/" exact element={<PreElectionScreen />} />
        <Route path="/admin" exact element={<AdminScreen />} />
        <Route path="/nominate" exact element={<CandidateNominateScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
