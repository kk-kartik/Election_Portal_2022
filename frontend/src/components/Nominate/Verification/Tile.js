import styles from "./Tile.module.css"
import doneSVG from "./done.svg"
import notdoneSVG from "./notdone.svg"
const Tile = (props)=>{
    let checkbox = <img src={notdoneSVG} className="mr-0 ml-auto"/>
    if(props.done === true){
        checkbox = <img src={doneSVG} className="mr-0 ml-auto"/>
    }
    return (
        <div className={`${styles.main} flex pl-4 pb-4 pt-4 pr-4 w-5/12 mr-4 my-1`}>
            <img src={props.svg} className={`mr-2`}></img>
            <div className={styles.text}>
                {props.text}
            </div>
            {checkbox}
        </div>
    );
}

export default Tile;