const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Role } = require("../models/role.model");
const createError = require("http-errors");
var CryptoJS = require("crypto-js");

function authorize(responsibility) {
  return [
    //Check if logged in
    async (req, res, next) => {
      console.log("AUTHORIZE");
      const secret = process.env.ACCESS_TOKEN_SECRET;

      const secretKey = process.env.AES_DECRYPTION_KEY;
      const rawToken = req.header("x-auth-token");
      

      const token = CryptoJS.AES.decrypt(rawToken, secretKey).toString(CryptoJS.enc.Utf8);

      // console.log("THE TOKEN", token)

      //console.log("RESPONSIBILITY", responsibility)

      //console.log("REQ.COOKIE", token);
      if (!token) {
        //console.log("ERROR HERE")
        next(createError.Unauthorized("Access Denied"));
      }

      try {
        // console.log("TOKEN", token);
        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        // console.log("REQ.USER", req.user);
        next();
      } catch (e) {
        console.log("INVALID TOKEN");
        next(createError.Unauthorized("Access Denied"));
      }
    },
  ];
}

module.exports = authorize;
