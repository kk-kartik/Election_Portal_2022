import react from "react";
import { Breadcrumbs } from "@primer/react";
import styles from "./BreadCrumbs.module.css"
const BreadCrumbs = (props) => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/election_portal" className={styles.item}>Gymkhana Elections 2021</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/election_portal/candidate" className={styles.item}>{props.position}</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/election_portal/candidate/*" className={styles.selected_item} selected>
          {props.name}
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
