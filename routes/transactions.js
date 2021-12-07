import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
} from "../helper.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const result = await getTransaction();
    res.send(result);
  })
  .post(async (req, res) => {
    const { text, amount } = req.body;
    const transaction = await createTransaction(text, amount);
    res.send(transaction);
  });

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const transaction = await deleteTransaction(id);
  res.send(transaction);
});

export const transRouter = router;
