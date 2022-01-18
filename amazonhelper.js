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
