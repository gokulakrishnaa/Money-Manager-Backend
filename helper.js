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

async function getOneTransaction(id) {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .findOne({ _id: ObjectId(id) });
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
    .deleteOne({ _id: ObjectId(id) });
}

export { getTransaction, createTransaction, deleteTransaction };
