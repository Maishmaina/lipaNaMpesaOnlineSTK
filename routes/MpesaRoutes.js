import express from "express";
import {
  lipaNaMpesa,
  lipaNaMpesaCallBack,
} from "../controllers/MpesaConrollers.js";
import { genMpesaOAuthToken } from "../middleware/tokenMiddleware.js";

const router = express.Router();

router.route("/lipanampesa").post(genMpesaOAuthToken, lipaNaMpesa);

router.route("/lipCallback").post(lipaNaMpesaCallBack);
export default router;
