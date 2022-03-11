import RouteNavbar2 from "./RouteNavbar"
import Datebox from "../Datebox";

const HomeRouteNavBar = () => {
    return(
        <RouteNavbar2 
        text={["About","Nominations","Statistics","Rules and Regulations","Organisers"]}
        routes={["about", "nominations", "stats", "rules","organisers"]}
        onOpenMenu={()=>{
          document.getElementById("datebox").style.display = "none";
        }}
        onCloseMenu={()=>{
          document.getElementById("datebox").style.display = "flex";
        }}
        mobWidth="w-2/3"
      >
        <h1 className="font-normal text-3xl">Gymkhana Elections 2021</h1>
        <Datebox></Datebox>
      </RouteNavbar2>
    );
}
export default HomeRouteNavBar;