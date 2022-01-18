import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { transRouter } from "./routes/transactions.js";
import { amazonRouter } from "./routes/amazon.js";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB Connected");
  return client;
}

export const client = await createConnection();

export async function genPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Get Request
app.get("/", (request, response) => {
  response.send("Hello");
});

// Transaction Router
app.use("/api/transactions", transRouter);

// Amazon Router
app.use("/api/amazon", amazonRouter);

// Payment gateway
app.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;
    console.log("Payment Request Received", total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

app.listen(PORT, () => console.log("App Started in", PORT));
