import { ObjectId } from "bson";
import { client } from "./index.js";

// GET all transaction details from Database
async function getTransaction() {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .find({})
    .toArray();
}

// POST new transaction to the Database
async function createTransaction(text, amount) {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .insertOne({ text, amount });
}

// DELETE transaction from the Database
async function deleteTransaction(id) {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .deleteOne({ id: ObjectId });
}

export { getTransaction, createTransaction, deleteTransaction };
