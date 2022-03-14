import React, { useEffect, useState } from "react";
import styles from "./Debates.module.css";
import Debate from "./Debate/Debate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Debates = () => {
  const [numberCard, setNumberCard] = useState(
    parseInt(window.innerWidth / 300)
  );
  useEffect(() => {
    function handleResize() {
      // console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      setNumberCard(parseInt(window.innerWidth / 300));
    }
    window.addEventListener("resize", handleResize);
  });

  // let y = parseInt(window.innerWidth / 300);

  return (
    <div className="pb-8">
      <h1 className="text-2xl text-gray-800 pt-8 pb-4">Upcoming Debates </h1>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={Math.min(numberCard, 8)}
          pagination={{ clickable: true }}
          // navigation
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
          <SwiperSlide>
            <Debate />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Debates;
