const express = require("express");
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');
const removeFromSale = express.Router();

removeFromSale.post("/", async () => {

    const checkID = await Marketplace.findOne({ forSaleIds: req.body.forSaleIds });
    if (!checkID) {
        console.log(req.body.forSaleIds)
        return resp.status(400).json({ message: "ID Doesnot Exist" })
    } else {

        await Marketplace.forSaleIds.map((item) => item !== req.body.forSaleIds);
        await Marketplace.save();
        console.log(req.body.forSaleIds)
        return resp.status(200).json({ message: "ID Removed SuccessFully" })
    }
})


module.exports = { removeFromSale }