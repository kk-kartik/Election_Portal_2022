export const BASEURL = process.env.REACT_APP_BASEURL;
export const BASEAPIURL = process.env.REACT_APP_BASEAPIURL;
export const ELECTIONAPI = process.env.REACT_APP_ELECTIONSAPI;
//export const VALIDAPIURL = process.env.REACT_APP_VALIDAPIURL;
export const IS_PROD = process.env.REACT_APP_ENV === "production";


export const pos2idMap = {
  vicepresident: "1",
  hab: "2",
  welfare: "3",
  swc: "4",
  technical: "5",
  sports: "6",
  sail: "7",
  ug: "8",
  cultural: "9",
  pg: "10",
  girl: "12",
  
};
export const posts=[
  {
    title: "Vice President",
    subposts: [
      {
        title: "",
        path: "vicepresident",
      },
    ],
  },
  {
    title: "Board Secretary",
    subposts: [
      {
        title: "Sports",
        path: "sports",
      },
      {
        title: "Welfare",
        path: "welfare",
      },
      {
        title: "Technical",
        path: "technical",
      },
      {
        title: "HAB",
        path: "hab",
      },
      {
        title: "Sail",
        path: "sail",
      },
      {
        title: "SWC",
        path: "swc",
      },
      {
        title: "Cultural",
        path: "cultural",
      },
    ],
  },
  {
    title: "Senator",
    subposts: [
      {
        title: "UG Senator",
        path: "ug",
      },
      {
        title: "PG Senator",
        path: "pg",
      },
      {
        title: "Girl Senator",
        path: "girl",
      },
    ],
  },
];