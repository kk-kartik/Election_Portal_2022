import React from "react";
import { Router, Routes } from "react-router-dom";
import styles from "./StatsChart.module.css"
import { useState } from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'


const color_map = [{
  name: "Brahmaputra",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Lohit",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Dihing",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Manas",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Disang",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Kapili",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Umiam",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Barak",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Siang",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Dibang",
  color: "rgba(75, 192, 192, 0.2)",
  borderColor: "black"
},
{
  name: "Subhansiri",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Dhansiri",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
},
{
  name: "Married Scholar",
  color: "rgba(255, 99, 132, 0.2)",
  borderColor: "black"
}
]

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

export const data = {
    labels: color_map.map((x)=>{return x.name}),
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3,3,3,3,7,8,9,11],
        backgroundColor: poolColors(color_map.length),
        borderColor: poolColors(color_map.length),
        borderWidth: 0,
      },
    ],
  };
const StatsChart = () => {
  const [active, setActive] = useState(0);
    const hostDeptClickListener = (elem)=>{
      if(elem.target.innerText === "Hostels"){
        if(active){
          setActive(0);
        }
      }
      else{
        if(!active){
          setActive(1);
        }
      }
    }
  return (
    <>
      <div className='w-full h-screen'>
            <span className={`${styles.head} hidden md:block`}>Vote Count</span>
            <div className={`flex ${styles.main} md:flex-row flex-col`}>
                <div className="flex mt-4 md:my-0 md:flex-col md:self-center ml-8 pr-10 lg:pr-32">
                  <div className="flex flex-col">
                    <span className={`${styles.dhead} text-center`}>3002</span>
                    <span className={styles.et}>Voters Count</span>   
                  </div>
                  <div className="flex flex-col ml-auto mr-0 md:mx-0">
                    <span className={`${styles.dhead} text-center`}>40%</span>
                    <span className={styles.et}>Voters Turnout</span>   
                  </div>
                </div>
                <div className='border-l my-10 pl-0 md:pl-14 w-full'>
                  <div className='flex justify-center' onClick={hostDeptClickListener}>
                    <button className={`${styles.btn} ${active ? '' : styles.active} px-4`}>Hostels</button>
                    <button className={`${styles.btn} ${active ? styles.active : ''} px-4`}>Departments</button>
                  </div>
                  <br/>
                  {/* <div> */}
                    <div>
                      <Bar data={data} options={{
                        plugins: {
                            title: {
                            display: true,
                            text: "Number of Votes"
                            },
                            legend: { 
                              display:false
                            }
                        }
                        }}/>
                    </div>
                    {/* <div className='flex gap-5 flex-wrap'>
                      {color_map.map((x)=><LegendItem data={x.name} color={x.color}/>)}
                    </div> */}
                  {/* </div> */}
              </div>
            </div>
        </div>
    </>
  );
};
export default StatsChart;
