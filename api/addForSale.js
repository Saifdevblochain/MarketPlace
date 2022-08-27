

const express = require("express");

const addForSale = express.Router();
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');

addForSale.post("/", async (req, resp) => {

    // await Marketplace.create({forSaleIds: [1,2,3]})

    const marketDocument = await Marketplace.findOne({ forSaleIds: req.body.forSaleIds });

    console.log("MarketDocuments", marketDocument)

    if (!marketDocument.forSaleIds.includes(req.body.forSaleIds)) {

        marketDocument.forSaleIds.map((item) => console.log(item))


        // await Marketplace.forSaleIds.push(req.body.forSaleIds);


        await marketDocument.forSaleIds.push(req.body.forSaleIds);

        // await Marketplace.save();

        await marketDocument.save()

        console.log(req.body.forSaleIds)

        return resp.status(200).json({ message: "ID Added for sale" })

    } else {

        console.log(rmarketDocument.forSaleIds)

        return resp.status(200).json({ message: "ID Already exists" })
    }
})

module.exports = { addForSale }