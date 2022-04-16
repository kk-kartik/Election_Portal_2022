import react from "react";
import { Breadcrumbs } from "@primer/react";
import styles from "./BreadCrumbs.module.css"

const pos2urlMap = {
  "President, SGC": "vicepresident",
  "General Secretary Welfare Board": "welfare",
  "General Secretary Sports Board": "sports",
  "General Secretary Technical Board": "technical",
  "General Secretary Cultural Board": "cultural",
  "General Secretary HAB": "hab",
  "General Secretary SAIL": "sail",
  "General Secretary SWC": "swc",
  "UG Senator": "ug",
  "PG Senator": "pg",
  "Girl Senator": "girl",
}

const BreadCrumbs = (props) => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/election_portal" className={styles.item}>Gymkhana Elections 2022</Breadcrumbs.Item>
        <Breadcrumbs.Item href={`/election_portal/nominations/${pos2urlMap[props.position]}`} className={styles.item}>{props.position}</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/election_portal/candidate/*" className={styles.selected_item} selected>
          {props.name}
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
