const express = require('express');
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');

const transfer = express.Router();

transfer.post("/", async (req, resp) => {


    const fromUserWallet = req.body.from;
    const toUserWallet = req.body.to;
    const nftID = req.body.id;

    // get user with {req.nody.from} and save it in const userOne
    // check if from user is the owner of {req.body.token}
    const userOne = await Users.findOne({ wallet: fromUserWallet })
    const userOneNFTS = await Nfts.findOne({ user: userOne._id })

    console.log(userOneNFTS);

    if ((userOneNFTS.nfts_collection).includes(nftID)) {
        // delete {req.body.id} from userOne
        userOneNFTS.nfts_collection = userOneNFTS.nfts_collection.filter(item => item !== nftID);
        await userOneNFTS.save();
        // get user with {req.body.to} and save it in const userTwo
        const userTwo = await Users.findOne({ wallet: toUserWallet })
        const userTwoNFTS = await Nfts.findOne({ user: userTwo._id })



        // add {req.body.id} to userTwo
        userTwoNFTS.nfts_collection.push(nftID);
        await userTwoNFTS.save();

        return resp.status(200).json({ message: "success" })
    } else {
        // error
        return resp.status(400).json({ nessage: "user does not own the toke ID" })
    }
})

module.exports = { transfer }