import React, { useEffect } from "react";
import { Router, Routes } from "react-router-dom";
import StatsChart from "../../components/Home/StatsChart/StatsChart";
import { useDispatch, useSelector } from "react-redux";
import getStats from "../../actions/getStats"
import HOSTELS from "../../constants/hostels";
import DEPT from "../../constants/depts";

var data;
const StatsScreen = () => {
  const statsData = useSelector((state) => state.getStats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);
  // console.log("Stats data ", statsData);
  if(statsData == null){
    return (
      <div>
        Loading...
      </div>
    );
  }
  let hostels = []
  let depts = []
  for(let key in statsData[0].stat_cnt){
    hostels = [...hostels, {name: HOSTELS[key], count: statsData[0].stat_cnt[key]}]
  }
  for(let key in statsData[1].stat_cnt){
    depts = [...depts, {name: DEPT[key], count: statsData[1].stat_cnt[key]}]
  }

  // console.log("hostels: ",  hostels)
  return (
    <>
      <StatsChart hostel={hostels} dept={depts}/>
    </>
  );
};
export default StatsScreen;
