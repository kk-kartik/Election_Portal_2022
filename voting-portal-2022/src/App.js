import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BASEURL } from "./constants";
import { getAllCandidates } from "./redux/actions/candidates";
import VotingScreen from "./screens/VotingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import StatusScreen from "./screens/StatusScreen";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  return (
    <div className="voting-portal-2022-wrapper">
      <BrowserRouter basename={BASEURL}>
        <Switch>
          <Route path="/" exact component={WelcomeScreen} />
          <Route path="/status" exact component={StatusScreen} />
          <Route path="/:position" exact component={VotingScreen} />

          {/* {There would other routes as per flow} */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
