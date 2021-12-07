import { ObjectId } from "bson";
import { client } from "./index.js";

async function getTransaction() {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .find({})
    .toArray();
}

async function createTransaction(text, amount) {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .insertOne({ text, amount });
}

async function deleteTransaction(id) {
  return await client
    .db("moneymanager")
    .collection("transactions")
    .deleteOne({ id: ObjectId });
}

export { getTransaction, createTransaction, deleteTransaction };
