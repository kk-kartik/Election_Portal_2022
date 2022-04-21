import election from "../ethereum/election";
import web3 from "../ethereum/webThree";
import { publicKey, privateKey, contractAddress } from "../constants";

import { Transaction as Tx } from "@ethereumjs/tx";
import Common, { Chain } from "@ethereumjs/common";

export const countVotes = async () => {
  const counts = await election.methods.voterCount().call();
  console.log(counts);
};

export const methodFunction = async (votes, voterId) => {
  // const votes = "1,2,32,67";
  // const voterId = "12";

  //  TO-DO (encrypt vote)

  const functionAbi = election.methods.store(voterId, votes).encodeABI();
  const common = new Common({ chain: Chain.Rinkeby });

  web3.eth.getTransactionCount(publicKey, function (err, nonce) {
    var details = {
      from: publicKey,
      nonce: nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
      gasLimit: 500000,
      to: contractAddress,
      value: 0,
      data: functionAbi,
    };

    var tx = Transaction.fromTxData(details, { common });
    const signedTx = tx.sign(Buffer.from(privateKey, "hex"));
    var serializedTx = signedTx.serialize();

    web3.eth
      .sendSignedTransaction("0x" + serializedTx.toString("hex"))
      .on("receipt", console.log)
      .on("error", console.log);
  });
};
