import express from "express";
import cors from "cors";
import vendorRouter from "./routes/vendorRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import adminRouter from "./routes/adminRoute.js";
import { verifyToken } from "./middleware/jwtAuthorization.js";

const app = express();
const corsOption = {
  // CORS: Allow commuincation across servers
  origin: "https://localhost:3000",
};

// Middlewares
app.use(cors(corsOption));
app.use(express.json());

// App Routes

app.use("/api/vendors", verifyToken, vendorRouter);
app.use("/api/clients", clientRouter);

// Handling Authentication for vendorRouter
// Handling Auth
app.use("/api/auth", adminRouter);

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
app.listen(8080, () => {
  console.log("Server is runing on port 8080");
});
