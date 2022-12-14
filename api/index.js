const express = require('express');

const { mintRouter } = require("./mint");
// const { addForSale } = require("./addForSale")
const { removeFromSale } = require("./removeFromSale")
const { adduser } = require("./adduser")
const { transfer } = require("./transfer")
const { BalanceOf } = require("./BalanceOf")

const API_ROUTER = express.Router();

API_ROUTER.use("/mint", mintRouter)
// API_ROUTER.use("/addForSate", addForSale)
API_ROUTER.use("/balanceOf", BalanceOf)
API_ROUTER.use("/removeFromSale", removeFromSale)
API_ROUTER.use("/adduser", adduser)
API_ROUTER.use('/transfer', transfer)

module.exports = { API_ROUTER }
