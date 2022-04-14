import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGallery from "../../components/Home/Gallery/CardGallery";
import FAQSection from "../../components/Home/FAQ/FAQSection";
import StepList from "../../components/Home/StepList/StepList";
import SideBarSection from "../../components/Home/SideNav/Sidebar";
const NominationScreen = (props) => {
  return (
    <>
      <h1 className="p-3 pt-0 font-medium text-xl">
        Steps For Nominating Yourself
      </h1>
      <StepList />
      <div className="grid grid-cols-12 gap-4 lg:mr-12">
        <div className="col-span-12 md:col-span-3">
          <SideBarSection posts={props.posts} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <Routes>
            {props.posts.map((post) => {
              return post.subposts.map((subpost) => {
                return (
                  <Route
                    path={subpost.path}
                    element={<CardGallery persons={subpost.persons} />}
                  />
                );
              });
            })}
          </Routes>
        </div>
        <div className="col-span-12 md:col-span-9">
          <FAQSection faq={props.faq} />
        </div>
      </div>
    </>
  );
};
export default NominationScreen;
