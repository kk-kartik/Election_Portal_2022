import React, { useEffect, useState } from "react";
import styles from "./Debates.module.css";
import Debate from "./Debate/Debate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getDebates,
} from "../../../actions/debates";
import { DateConvert } from "../../../utils";

const Debates = () => {
  const [numberCard, setNumberCard] = useState(
    parseInt(document.getElementById("container").innerWidth / 350)
  );
  useEffect(() => {
    function handleResize() {
      setNumberCard(parseInt(document.getElementById("container").innerWidth / 350));
    }
    window.addEventListener("resize", handleResize);
  });

  const debates = useSelector((state) => state.debates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDebates());
  }, [dispatch]);

  return (
    <div className="pb-8" id="container">
      <h1 className="text-2xl text-gray-800 pt-8 pb-4">Upcoming Debates </h1>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={120}
          slidesPerView={Math.min(numberCard, 4)}
          pagination={{ clickable: true }}
          // navigation
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          {debates.length !== 0 &&
            debates.map((data, idx) => {
              return (
                <SwiperSlide>
                  <Debate title={data?.title} date={DateConvert(data?.date)} time={data?.time}/>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Debates;
