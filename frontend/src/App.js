import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL } from "./config/constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";

function App() {
  return (
    <BrowserRouter basename={BASEURL}>
      <h1>Election Portal 2022</h1>
      <Routes>
        <Route path="/" exact element={<PreElectionScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
