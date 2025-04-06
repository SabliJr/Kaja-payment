import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import walletCheckoutRoutes from "./routes/wallet-checkout.route.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import fundsRoutes from "./routes/funds.route.js";
import onRampRoutes from "./routes/on-ramp.route.js";
import productsRoutes from "./routes/products.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";

import { IncomingMessage, ServerResponse } from "http";

//For env File
dotenv.config();
const PORT = 8080;

const app: Application = express();

declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

const corsOptions = {
  credentials: true,
  origin: [
    "localhost:3000",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8080",
    "http://localhost:3001",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3002",
  ],
  optionsSuccessStatus: 204,
  exposedHeaders: ["Set-Cookie", "ajax_redirect"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "XMLHttpRequest",
  ],
};

// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    verify: (req: IncomingMessage, res: ServerResponse, buf: Buffer) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/funds", fundsRoutes);
app.use("/on-ramp", onRampRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/wallet-checkout", walletCheckoutRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
