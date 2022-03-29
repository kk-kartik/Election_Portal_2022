import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

import TopNav from "../../components/Home/TopNav/TopNav";
import BlockchainMessage from "../../components/Home/BlockchainMessage/BlockchainMessage";
import HomeRouteNavBar from "../../components/Home/HomeRouteNavbar/HomeRouteNavBar";

import Vote from "./Vote";

const Layout = () => {
  return (
    <div className="md:ml-20 mt-12 mr-4 ml-4">
      <Outlet />
    </div>
  );
};

const ElectionScreen = () => {
  return (
    <>
      <div>
        <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
          <HomeRouteNavBar />
        </div>
        <Routes element={<Layout />}>
          <Route path="vote" exact element={<Vote />} />
        </Routes>
      </div>
    </>
  );
};

export default ElectionScreen;
