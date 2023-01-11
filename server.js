import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import vendorRouter from "./routes/vendorRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";

// Authentication import
import { verifyjwt } from "./middleware/verifyJWT.js";
import refreshRouter from "./routes/refreshRoutes.js";
import logoutRouter from "./routes/logoutRoutes.js";

// Image handling Import
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
const corsOption = {
  // CORS: Allow commuincation across servers
  origin: "https://localhost:3000",
};

// Middlewares
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());

// App Routes
app.use("/api/vendors", vendorRouter);
app.use("/api/clients", verifyjwt, clientRouter);
app.use("/api/admins", adminRouter);

// static folder
app.use("/profile", express.static("images")); //for Clients
app.use("/admin/profile", express.static("images/admin")); //for Clients

// Handling Authentication for vendorRouter
// Handling Auth
app.use("/auth/login/", authRouter); //for client -> /auth/login/client
app.use("/auth/login/", authRouter); //for admin -> /auth/login/admin

app.use("/auth/refresh/", refreshRouter);
app.use("/logout", logoutRouter);

// Test API routing
app.get("/test", (req, res) => {
  res.status(200).send("Builder Vilage Test route is working fine");
});

// Handling Errors
// Express5 is in beta stage. it has a middleware that handle http error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke the sever!");
});

// Listening
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
