const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware.js");
const { Account } = require("../db.js");
const mongoose = require("mongoose");
const zod = require("zod");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

const transferBody = zod.object({
  amount: zod.number(),
  to: zod.string(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { success } = transferBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid amount / user account",
    });
  }
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session,
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Invalid Account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer successfull",
  });
});

module.exports = router;
