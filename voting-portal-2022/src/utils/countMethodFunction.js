import election from "../ethereum/election";
import web3 from "../ethereum/webThree";
import { publicKey, privateKey, contractAddress } from "../constants";

const Tx = require("ethereumjs-tx").Transaction;

export const countVotes = async () => {
  const counts = await election.methods.voterCount().call();
  console.log(counts);
};

export const methodFunction = async (votes, voterId) => {
  // const votes = "1,2,32,67";
  // const voterId = "12";
  /**
   * TO-DO (encrypt vote)
   */
  const functionAbi = election.methods.store(voterId, votes).encodeABI();

  web3.eth.getTransactionCount(publicKey, function (err, nonce) {
    var details = {
      from: web3.utils.toChecksumAddress(publicKey),
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
      gasLimit: 500000,
      to: contractAddress,
      value: 0,
      data: functionAbi,
    };

    var tx = new Tx(details, { chain: "rinkeby" });
    tx.sign(Buffer.from(privateKey, "hex"));
    var serializedTx = tx.serialize();

    web3.eth
      .sendSignedTransaction("0x" + serializedTx.toString("hex"))
      .on("receipt", console.log)
      .on("error", console.log);
  });
};
