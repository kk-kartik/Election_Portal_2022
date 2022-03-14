import RouteNavbar from "../../Navbars/RouteNavbar"
import styles from "./ProfileNavBar.module.css"
import Eye from "./Eye"
const ProfileNavBar = () => {
    return(
        <RouteNavbar 
        text={["About","Agendas","Credentials","Video","Verification", "Analytics"]}
        routes={["about", "agendas", "credentials", "video","verification","analytics"]}
        mobWidth="w-full"
      >
      <div className="flex">
        <span className="font-normal text-3xl underline">Gymkhana Elections 2021</span><span className="font-normal text-3xl">&nbsp; / My Profile &nbsp;</span>
        <button className={`${styles.notver} py-1 px-5 ml-auto`}>Not Verified</button>
        <button className={`${styles.preview} py-1 px-5 ml-4 mr-4`}><span className="flex"><div className="flex items-center mr-1"><Eye /></div><div className="flex items-center mr-1">Preview</div></span></button>
      </div>
  
      </RouteNavbar>
    );
}
export default ProfileNavBar;