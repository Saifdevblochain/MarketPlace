const express = require('express');
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');

const adduser = express.Router();

adduser.post("/", async (req,resp) => {
    let address_ =req.body.wallet
    const checkWallet = await Users.findOne({ wallet: address_ });
    if (checkWallet) {
        return resp.status(200).json({ message: "User Exists" });
    } else {
        const addWallet = await Users.create({ wallet: req.body.wallet });
        await Nfts.create({ user: addWallet._id, nfts_collection: [] });
        return resp.status(200).json({ message: " User Added SuccessFully ! " })
    }
})

module.exports = { adduser }