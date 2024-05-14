import crypto from "crypto-js";

const decryptLS = (data: string) => {
  const secretKey = process.env.REACT_APP_LS_DECRYPTION_KEY;

  if (secretKey) {
    try {
      const decrypted = crypto.AES.decrypt(data, secretKey).toString(
        crypto.enc.Utf8
      );

      return decrypted.toString();
    } catch (error) {
      //////////console.log("ERROR", error);
    }
  }
};

export default decryptLS
