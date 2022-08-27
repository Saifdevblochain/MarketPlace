const express = require('express');
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');

const mintRouter = express.Router();

mintRouter.post('/', async (req, resp) => {
    console.log(req.body)
    try {
        await Users.findOne()
        return resp.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "Something is wrong with the server" });
    }
})

module.exports = { mintRouter }


