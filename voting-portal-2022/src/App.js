import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BASEURL } from "./constants";
import { getAllCandidates } from "./redux/actions/candidates";
import VotingScreen from "./screens/VotingScreen";
import StatusScreen from "./screens/StatusScreen";
import Loading from "./components/Loader/Loading";
import StartVotingButton from "./components/StartVotingButton/StartVotingButton";
import VotingIdGenScreen from "./screens/VotingIdGenScreen";
import EnterVoterIdScreen from "./screens/EnterVoterIdScreen";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  return (
    <div className="voting-portal-2022-wrapper">
      <BrowserRouter basename={BASEURL}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <StatusScreen>
                <StartVotingButton />
              </StatusScreen>
            )}
          />
          <Route path="/enterid" exact component={EnterVoterIdScreen} />
          <Route path="/otp" exact component={VotingIdGenScreen} />
          <Route
            path="/status"
            exact
            render={() => (
              <StatusScreen>
                <Loading text="Please wait till we process your vote" />
              </StatusScreen>
            )}
          />
          <Route path="/:position" exact component={VotingScreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
