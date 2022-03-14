import styles from "./Datebox.module.css"
const Datebox = () => {
return(
    <div className={`${styles.dateBox} absolute`} id="datebox">
        <div className={styles.month}>FEB</div>
        <div className={styles.date}>20</div>
        <div className={styles.day}>Saturday</div>
    </div>
);
}
export default Datebox;