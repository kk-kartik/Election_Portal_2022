export const BASEURL = process.env.REACT_APP_BASEURL;
export const BASEAPIURL = process.env.REACT_APP_BASEAPIURL;
export const ELECTIONAPI = process.env.REACT_APP_ELECTIONSAPI;
//export const VALIDAPIURL = process.env.REACT_APP_VALIDAPIURL;
export const IS_PROD = process.env.REACT_APP_ENV === "production";

export const posIdtoNotaId = {
  vicepresident: "-1",
  hab: "-2",
  welfare: "-3",
  swc: "-4",
  technical: "-5",
  sports: "-6",
  sail: "-7",
  ug: "-8",
  cultural: "-9",
  pg: "-10",
  girl: "-12",
};
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
export const posts = [
  {
    title: "Executives",
    subposts: [
      {
        title: "Vice President",
        path: "vicepresident",
      },
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
    title: "Senate",
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

export const publicKey = "0xD0e203A04Eb4024Fbd90768b46E37aC67F1Cd707";
export const privateKey =
  "9f94794beb1b094dfa4dd85f1190703500e5179fe4b53767dcfc785eaa4620b0";
export const contractAddress = "0x4e6a5bfb44c6d243a44ed5f6704be50c38ac289f";
