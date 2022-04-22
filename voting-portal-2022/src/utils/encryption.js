import { JSEncrypt } from "js-encrypt";

import { notBlockChainKey } from "../constants";

export const encryptFunction = (vote) => {
  const publicEncKey = notBlockChainKey;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicEncKey);
  var encrypted = encrypt.encrypt(vote);
  return encrypted;
};
