import JSEncrypt from "jsencrypt";
import { publicKey } from "../constants";
import BlindSignature from "blind-signatures";
import { BigInteger } from "jsencrypt/lib/lib/jsbn/jsbn";

export const encryptVote = (vote) => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);

  return jsEncrypt.encrypt(vote);
};

export const blindVote = (encrptedVote, NEpair) => {
  const { blinded, r } = BlindSignature.blind({
    message: encrptedVote,
    ...NEpair,
  });
  return { blindedVote: blinded.toString(), r };
};

export const verifySign = (r, encryptedVote, signedVote, NEpair) => {
  const unblinded = BlindSignature.unblind({
    signed: BigInteger(signedVote),
    ...NEpair,
    r,
  });
  console.log("Unblinded", unblinded);
  console.log("Signed vote", signedVote);
  const result = BlindSignature.verify({
    unblinded: unblinded,
    ...NEpair,
    message: encryptedVote,
  });
  return result;
};
