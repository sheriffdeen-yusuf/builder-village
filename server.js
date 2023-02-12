import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import vendorRouter from "./routes/vendorRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
import emailActivateRouter from "./routes/emailActivationRoutes.js";

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
app.use("/api/vendors", verifyjwt, vendorRouter);
app.use("/api/clients", clientRouter);
app.use("/api/admins", verifyjwt, adminRouter);

// static folder
app.use("/tmp/profiles", express.static("tmp")); //for serveless storage on cyclic
app.use("/client/profile", express.static("images/client")); //for Clients
app.use("/admin/profile", express.static("images/admin")); //for Admins
app.use("/vendor/profile", express.static("images/vendor")); //for Vendors

// Activating users account
app.use("/activate-account", emailActivateRouter);

// Handling Authentication for vendorRouter
// Handling Auth
app.use("/auth/login/", authRouter); //for client and admin -> /auth/login/client -> /auth/login/admin
app.use("/auth/login/", authRouter); //for vendor, still same base route, /auth/login/vendor

app.use("/auth/refresh/", refreshRouter); //for client, admin & vendor-> /auth/refresh/{client | admin |vendor}
app.use("/logout", logoutRouter); //for client, admin & vendor->  {client | admin |vendor}/logout

// Test API routing
app.get("/", (req, res) => {
  res.status(200).send("Builder Vilage Test route is working fine");
});

// Handling Errors
// Express5 is in beta stage. it has a middleware that handle http error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke the sever!");
});

// Listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
