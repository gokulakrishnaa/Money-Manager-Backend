import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { transRouter } from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Create a MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB Connected");
  return client;
}

export const client = await createConnection();

// Get Request
app.get("/", (request, response) => {
  response.send("Hello");
});

// Transaction Router
app.use("/api/transactions", transRouter);

app.listen(PORT, () => console.log("App Started in", PORT));
