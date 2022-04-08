import RouteNavbar from "../../Navbars/RouteNavbar";
import styles from "./ProfileNavBar.module.css";
import Eye from "./eye.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function capitalizeFirstLetter(string) {
  if (!string) return null;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ProfileNavBar = () => {
  const candidate = useSelector((store) => store.candidate);
  return (
    <RouteNavbar
      text={[
        "About",
        "Agendas",
        "Credentials",
        "Video",
        "Witnesses",
        "Verification",
      ]}
      routes={[
        "about",
        "agendas",
        "credentials",
        "video",
        "witnesses",
        "verification",
      ]}
      mobWidth="w-full"
    >
      <div className="flex">
        <span className="font-normal text-3xl underline hidden lg:block">
          <Link to="/">Gymkhana Elections 2022</Link>
        </span>
        <span className="font-normal text-3xl hidden lg:block">&nbsp; / </span>
        <span className="font-normal text-2xl sm:text-3xl">
          &nbsp;My Profile &nbsp;
        </span>
        <button className={`${styles.notver} py-1 px-3 sm:px-5 ml-auto mr-4`}>
          {`Verification ${capitalizeFirstLetter(
            candidate?.nomination_status
          )}` || "Not Verified"}
        </button>
        {/* <button
          className={`${styles.preview} py-1 pl-2 pr-1 sm:px-5 mr-4`}
        >
          <span className="flex">
            <div className="flex items-center mr-1">
              <img className="min-w-fit	max-w-fit" src={Eye} />{" "}
            </div>
            <div className="flex items-center mr-1 hidden sm:block">
              Preview
            </div>
          </span>
        </button> */}
      </div>
    </RouteNavbar>
  );
};
export default ProfileNavBar;
