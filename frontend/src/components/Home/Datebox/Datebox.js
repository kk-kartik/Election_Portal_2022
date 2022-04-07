import styles from "./Datebox.module.css";
const Datebox = () => {
  return (
    <div className={`${styles.dateBox} absolute`} id="datebox">
      <div className={styles.month}>APR</div>
      <div className={styles.date}>23</div>
      <div className={styles.day}>Saturday</div>
    </div>
  );
};
export default Datebox;
