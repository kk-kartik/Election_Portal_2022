import Web3 from "web3";

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/b0650f4002b447958861d453c56251f5"
);
web3 = new Web3(provider);

export default web3;
