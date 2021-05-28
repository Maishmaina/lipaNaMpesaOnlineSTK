import axios from "axios";
import asyncHandler from "express-async-handler";
// @desc    Auth and Token generation
// @route   GET /api/mpesa/tokengen
// @access  private

const genMpesaOAuthToken = asyncHandler(async (req, res, next) => {
  const consumerKey = process.env.MpesaConsumerKey;
  const consumerSecret = process.env.MpesaConsumerSecret;
  const OAuthURI = process.env.OAuthTokenURI;

  //generate a buffer of consumer and secret

  const buffer = new Buffer.from(consumerKey + ":" + consumerSecret);

  const OAuth = `Basic ${buffer.toString("base64")}`;

  const { data } = await axios.get(OAuthURI, {
    headers: {
      Authorization: OAuth,
    },
  });
  if (data) {
    req.token = data["access_token"];
  } else {
    throw new Error("Token Never Generated");
  }
  next();
});

export { genMpesaOAuthToken };
