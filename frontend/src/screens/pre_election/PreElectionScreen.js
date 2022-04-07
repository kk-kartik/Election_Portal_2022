import React from "react";
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
const PreElectionScreen = () => {
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
                          persons: [
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 1,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 1,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 1,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 1,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: "Board Secretary",
                      subposts: [
                        {
                          title: "Sports",
                          path: "sports",
                          persons: [
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 1,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 2,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 3,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 4,
                            },
                            {
                              image: lime,
                              name: "Samantha Grace",
                              motto: "Keep sleeping",
                              uniqueid: 4,
                            },
                          ],
                        },
                      ],
                    },
                  ]}
                  faq={[
                    {
                      question: "How is life?",
                      answer: "Very bad",
                    },
                    {
                      question: "How is health?",
                      answer: "Very bad",
                    },
                    {
                      question: "How is college?",
                      answer: "Closed ",
                    },
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
      <Footer />
    </>
  );
};

export default PreElectionScreen;
