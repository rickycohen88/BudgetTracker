const router = require("express").Router();
const Transaction = require("../models/transaction.js");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useFindAndModify: false
});
const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("connected to DB");
    });

router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;