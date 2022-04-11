import react from "react";
import { Breadcrumbs } from "@primer/react";
import styles from "./BreadCrumbs.module.css"
const BreadCrumbs = () => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/election_portal" className={styles.item}>Gymkhana Elections 2021</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/election_portal/candidate" className={styles.item}>Vice President</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/election_portal/candidate/*" className={styles.selected_item} selected>
          Albert Froes
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
