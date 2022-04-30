import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGallery from "../../components/Home/Gallery/CardGallery";
import FAQSection from "../../components/Home/FAQ/FAQSection";
import StepList from "../../components/Home/StepList/StepList";
import SideBarSection from "../../components/Home/SideNav/Sidebar";
import StickyBox from "react-sticky-box";
import { Helmet } from "react-helmet";
import styles from "./ResultsScreen.module.css"
import Card from "../../components/Home/Results/Card/Card";
import StatsChart from "../../components/Home/StatsChart/StatsChart";
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'
function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }
function poolColors(a) {
    var pool = [];
    for(let i = 0; i < a; i++) {
        pool.push(dynamicColors());
    }
    return pool;
  }
  
const ResultsScreen = (props) => {
    let person = {
        name: "Sarthak Saxena",
        image: "http://swc.iitg.ac.in/elections_api/media/candidate_profile/WhatsApp_Image_2022-04-10_at_9.47.14_PM_1.jpeg",
        branch: "B.Tech, Electronics and Communications 2023",
        vote_lead: "120"
    }
    let hostels = [{
        name: "Dihing",
        count: 12
    },
    {
        name: "Disang",
        count: 30
    },
]
    const data = {
        labels: hostels.map((d)=>{return d.name}),
        datasets: [
          {
            label: '# of Votes',
            data: hostels.map((d)=>{return d.count}),
            backgroundColor: poolColors(11),
            borderColor: poolColors(11),
            borderWidth: 0,
          },
        ],
      };
  return (
    <>

        <Helmet>
        <title>Winners | Election Portal</title>
      </Helmet>
        <div>
          <div className={`${styles.win} ml-3`}>
              Winners
          </div>
        <div className="flex">
            <div className="w-5/12 md:w-3/12">
                <StickyBox offsetTop={20} offsetBottom={20} >
                    <SideBarSection posts={props.posts} />
                </StickyBox>
            </div>
            <div className="flex flex-col">
                <div className={`${styles.title} ml-8`}>
                    Vice President, SGC ‘22
                </div>
                <div className="flex mt-3 ml-8">
                    <Card person={person}/>
                </div>
                <div className={`${styles.title} ml-8 mt-8 mb-8`}>
                    Vote Count
                </div>
                <div>
                    <Bar data={data} options={{
                            plugins: {
                                title: {
                                display: false,
                                text: "Number of Votes"
                                },
                                legend: { 
                                display:false
                                }
                            }
                            }}/>
                </div>
            </div>

        </div>

        
        </div>
      {/* <StatsChart hostel={hostels} dept={depts}/> */}
    </>
  );
};
export default ResultsScreen;
