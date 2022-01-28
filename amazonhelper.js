import { client } from "./index.js";

// Create new user
export async function createUser(data) {
  return await client.db("amazon").collection("users").insertOne(data);
}

// Get user by Mail
export async function getUserByMail(email) {
  return await client
    .db("amazon")
    .collection("users")
    .findOne({ email: email });
}

// Create Login status
export async function createStatus(data) {
  return await client.db("amazon").collection("status").insertOne(data);
}

// Get Login status
export async function getStatus(email) {
  return await client
    .db("amazon")
    .collection("status")
    .findOne({ email: email });
}

// Create order
export async function createOrder(data) {
  return await client.db("amazon").collection("orders").insertOne(data);
}

//Get Order Data
export async function orderDataById(email) {
  return await client
    .db("amazon")
    .collection("orders")
    .findOne({ email: email });
}
