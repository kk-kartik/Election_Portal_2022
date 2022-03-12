import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css"

const Sidebar = ({ children }) => {
  const [hamburger, setHamburger] = useState(false);
  const linkSidebar =
    "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item";
  const linkDropdown =
    "flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item";

  const authBtn = (
    <a href="#" className={linkDropdown}>
      {" "}
      Login
    </a>
  );
  const BASEURL = "/election";
  return (
    <>
      <aside className={`relative ${styles.bgsidebar} w-64 hidden sm:block shadow-xl`}>
        <div className="p-6">
          <Link
            to="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            ADMIN
          </Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <Link to={`${BASEURL}/admin/about`} className={linkSidebar}>
            About
          </Link>
          <Link to={`${BASEURL}/admin/announcements`} className={linkSidebar}>
            Announcements
          </Link>
          <Link to={`${BASEURL}/admin/achievements`} className={linkSidebar}>
            Achievements
          </Link>
          <Link to={`${BASEURL}/admin/forms`} className={linkSidebar}>
            Forms
          </Link>
          <Link to={`${BASEURL}/admin/gallery`} className={linkSidebar}>
            Gallery
          </Link>
          <Link to={`${BASEURL}/admin/sac`} className={linkSidebar}>
            SAC
          </Link>
          <Link to={`${BASEURL}/admin/events`} className={linkSidebar}>
            Events
          </Link>
          <Link to={`${BASEURL}/admin/navigation`} className={linkSidebar}>
            Navigation
          </Link>
          <Link
            to={`${BASEURL}/admin/scholarshipEditor`}
            className={linkSidebar}
          >
            Scholarships{`(R&O)`}
          </Link>
          <Link
            to={`${BASEURL}/admin/scholarshipLinks`}
            className={linkSidebar}
          >
            Scholarship Links{`(PDFs)`}
          </Link>
          <Link to={`${BASEURL}/admin/rules`} className={linkSidebar}>
            Rules
          </Link>
          <Link to={`${BASEURL}/admin/courses`} className={linkSidebar}>
            SA Courses
          </Link>
          <Link to={`${BASEURL}/admin/utilities`} className={linkSidebar}>
            Utilities
          </Link>
          <Link to={`${BASEURL}/admin/team`} className={linkSidebar}>
            Team
          </Link>
          <Link to={`${BASEURL}/admin/users`} className={linkSidebar}>
            Users
          </Link>
        </nav>
      </aside>

      <div className="relative w-full flex flex-col overflow-y-hidden">
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end"></div>
        </header>

        <header className={`w-full ${styles.bgsidebar} py-5 px-6 sm:hidden`}>
          <div className="flex items-center justify-between">
            <Link
              to={`${BASEURL}/admin/`}
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={() => setHamburger(!hamburger)}
              className="text-white text-3xl focus:outline-none"
            >
              {hamburger ? "X" : "O"}
            </button>
          </div>

          <nav
            className={
              hamburger
                ? "flex flex flex-col pt-4"
                : "hidden flex flex-col pt-4"
            }
          >
            <>
              <Link to={`${BASEURL}/admin/about`} className={linkDropdown}>
                About
              </Link>
              <Link
                to={`${BASEURL}/admin/announcements`}
                className={linkDropdown}
              >
                Announcements
              </Link>
              <Link
                to={`${BASEURL}/admin/achievements`}
                className={linkDropdown}
              >
                Achievements
              </Link>
              <Link to={`${BASEURL}/admin/forms`} className={linkDropdown}>
                Forms
              </Link>
              <Link to={`${BASEURL}/admin/gallery`} className={linkDropdown}>
                Gallery
              </Link>
              <Link to={`${BASEURL}/admin/events`} className={linkDropdown}>
                Events
              </Link>
              <Link to={`${BASEURL}/admin/navigation`} className={linkDropdown}>
                Navigation
              </Link>
              <Link to={`${BASEURL}/admin/courses`} className={linkDropdown}>
                SA Courses
              </Link>
              <Link
                to={`${BASEURL}/admin/scholarshipEditor`}
                className={linkDropdown}
              >
                Scholarships{`(R&O)`}
              </Link>
              <Link
                to={`${BASEURL}/admin/scholarshipLinks`}
                className={linkDropdown}
              >
                Scholarship Links{`(PDFs)`}
              </Link>
              <Link to={`${BASEURL}/admin/rules`} className={linkDropdown}>
                Rules
              </Link>
              <Link to={`${BASEURL}/admin/utilities`} className={linkDropdown}>
                Utilities
              </Link>
              <Link to={`${BASEURL}/admin/team`} className={linkDropdown}>
                Teams
              </Link>
              <Link to={`${BASEURL}/admin/users`} className={linkDropdown}>
                Users
              </Link>
            </>
            {authBtn}
          </nav>
        </header>
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
