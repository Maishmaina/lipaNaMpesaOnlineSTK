import axios from "axios";
import asyncHandler from "express-async-handler";

// @desc    LipaNaMpesa
// @route   POST /api/mpesa/lipanampesa
// @access  private

const lipaNaMpesa = asyncHandler(async (req, res) => {
  const token = req.token;
  const auth = `Bearer ${token}`;
  const httpsCllback = "https://0116bbcb3152.ngrok.io/api/mpesa/lipCallback";

  const timeStampLipa = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  const lipaURI = process.env.lipaNaMpesaURI;
  const bsShortCode = process.env.LipaShortCode;
  const passKey = process.env.lipaPassKey;

  let password = new Buffer.from(
    `${bsShortCode}${passKey}${timeStampLipa}`
  ).toString("base64");
  let transcation_type = "CustomerPayBillOnline";
  let amount = req.amount; //amount
  let partyA = req.phoneNumber; //2547
  let partyB = bsShortCode;
  let phoneNumber = req.phoneNumber; //2547xxxxxxxx
  let callBackUrl = httpsCllback;
  let accountReference = "QUANTA DEV";
  let transaction_desc = "QuantaBs";

  const { data } = await axios.post(
    lipaURI,
    {
      BusinessShortCode: partyB,
      Password: password,
      Timestamp: timeStampLipa,
      TransactionType: transcation_type,
      Amount: amount,
      PartyA: partyA,
      PartyB: partyB,
      PhoneNumber: phoneNumber,
      CallBackURL: callBackUrl,
      AccountReference: accountReference,
      TransactionDesc: transaction_desc,
    },
    {
      headers: {
        Authorization: auth,
      },
    }
  );
  if (data) {
    res.status(200).json(data);
  } else {
    throw new Error("Error where requesting payment");
  }
});
// @desc    LipaNaMpesa
// @route   POST /api/mpesa/lipCallback
// @access  private

const lipaNaMpesaCallBack = asyncHandler(async (req, res) => {
  const data = req.body.Body.stkCallback;

  if (data) {
    console.log(data.ResultCode);
    console.log("------------------See below result---------------------");
    console.log(data.CallbackMetadata);
    return res.send(data);
  } else {
    throw new Error("There is no response Now, something went wrong");
  }
});
export { lipaNaMpesa, lipaNaMpesaCallBack };
