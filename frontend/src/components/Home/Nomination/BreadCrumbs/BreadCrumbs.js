import react from "react";
import { Breadcrumbs } from "@primer/react";

const BreadCrumbs = () => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/" className="text-blue-800">Gymkhana Elections 2021</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/about" className="text-blue-800">Vice President</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/about/team" selected>
          Albert Froes
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
