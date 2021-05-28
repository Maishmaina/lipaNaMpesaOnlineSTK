import express from "express";
import dotenv from "dotenv";
import mpesaRoutes from "./routes/MpesaRoutes.js";

//instantiate imports
dotenv.config();
const app = express();

// req.body for post request
app.use(express.json());

//mount route
app.use("/api/mpesa", mpesaRoutes);

//run application
app.get("/", (req, res) => res.send("M-Pesa money Running"));

//Running port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`${process.env.NODE_ENV} server on port ${PORT}`));
