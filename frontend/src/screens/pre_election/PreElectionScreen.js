import React, {useEffect} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AboutScreen from "./AboutScreen";
import Footer from "../../components/Footer/Footer";
import NominationScreen from "./NominationScreen";
import TopNav from "../../components/Home/TopNav/TopNav";
import BlockchainMessage from "../../components/Home/BlockchainMessage/BlockchainMessage";
import HomeRouteNavBar from "../../components/Home/HomeRouteNavbar/HomeRouteNavBar";
import StatsScreen from "./StatsScreen";
import RulesScreen from "./RulesScreen";
import OrganisersScreen from "./OrganisersScreen";
import lime from "../../assets/Lime.jpg";
import NewFooter from "../../components/Footer/NewFooter";
import { useDispatch, useSelector } from "react-redux";
import { getPos, getCandidateFromPosition } from "../../actions/positions";
const Layout = () => {
  return (
    <div
      className="mt-12  ml-1 mr-1 md:ml-16 md:mr-10"
      style={{ maxWidth: "1240px" }}
    >
      <Outlet />
    </div>
  );
};

const position_ids = [1,2,3,4,5,6,7,8,9,10,12]
const PreElectionScreen = () => {
  const positions = useSelector((store) => store.positions);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    position_ids.forEach((pos)=>{dispatch(getCandidateFromPosition(pos))});
  }, []);
  console.log("--positions--");
  console.log(positions);
  
  let all_positions = {};
  positions.forEach((pos)=>{all_positions[`${pos.id}`] = pos.data});
  console.log("all-positions");
  console.log(all_positions);
  return (
    <>
      <div
        style={{
          minHeight: "83vh",
        }}
      >
        {/* Pre-election navbar */}

        <BlockchainMessage />
        {/* Routes Navbar */}
        <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
          <HomeRouteNavBar />
        </div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" exact element={<AboutScreen />} />
            <Route
              path="nominations/*"
              exact
              element={
                <NominationScreen
                  posts={[
                    {
                      title: "Vice President",
                      subposts: [
                        {
                          title: "",
                          path: "vicepresident",
                          persons: all_positions['1'],
                        },
                      ],
                    },
                    {
                      title: "Board Secretary",
                      subposts: [
                        {
                          title: "Sports",
                          path: "sports",
                          persons: all_positions['6'],
                        },
                        {
                          title: "Welfare",
                          path: "welfare",
                          persons: all_positions['3'],
                        },
                        {
                          title: "HAB",
                          path: "hab",
                          persons: all_positions['2'],
                        },
                        {
                          title: "Sail",
                          path: "sail",
                          persons: all_positions['7'],
                        },
                        {
                          title: "SWC",
                          path: "swc",
                          persons: all_positions['4'],
                        },
                        {
                          title: "Cultural",
                          path: "cultural",
                          persons: all_positions['9'],
                        },
                      ],
                    },
                    {
                      title: "Senator",
                      subposts: [
                        {
                          title: "UG Senator",
                          path: "ug",
                          persons: all_positions['8'],
                        },
                        {
                          title: "PG Senator",
                          path: "pg",
                          persons: all_positions['10'],
                        },
                        {
                          title: "Girl Senator",
                          path: "girl",
                          persons: all_positions['12'],
                        },
        
                      ],
                    },
                  ]}
                  faq={[
                    
                  ]}
                />
              }
            />
            <Route path="stats" exact element={<StatsScreen />} />
            <Route path="rules" exact element={<RulesScreen />} />
            <Route path="organisers" exact element={<OrganisersScreen />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
      <NewFooter />
    </>
  );
};

export default PreElectionScreen;
