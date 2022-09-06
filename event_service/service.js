const { ethers, Contract } = require("ethers");
const redis= require('redis')
const { connectDB, Users, Nfts, Marketplace } = require('../db/mongo')
const abi = require("./abi.json")
require("dotenv").config()
const publisher = redis.createClient();

publisher.connect();

 
const rpcUrl = process.env.rpcUrl;

const deployedAddress = process.env.deployedAddress;
const privatekey = process.env.privatekey;
 
let provider = ethers.getDefaultProvider(rpcUrl); //rpc url is from Alchemy: testnet that you used

const wallet = new ethers.Wallet(privatekey, provider);
const contract = new ethers.Contract(deployedAddress, abi, provider);

console.log("working 1");

contract.on("Transfer", async (from, to, _id) => {
    
    const id = parseInt(_id.toString());
    const toUser = await Users.findOne({ wallet: to });
    const toNfts = await Nfts.findOne({ user: toUser._id });

    if (from === '0x0000000000000000000000000000000000000000') {
        // add id to the users nft_collection
        toNfts.nfts_collection.push(id);
        await toNfts.save();
        await publisher.publish("message",JSON.stringify({from, to, id, status: "New"}));
    }
    else {
        const fromUser = await Users.findOne({ wallet: from });
        const fromNfts = await Nfts.findOne({ user: fromUser._id })

        fromNfts.nfts_collection = fromNfts.nfts_collection.filter(item => item != id)
        await fromNfts.save();

        toNfts.nfts_collection.push(id)
        await toNfts.save()
        await publisher.publish("message",JSON.stringify({from, to, id, status: "transer"})
        );

    }
 

    // console.log(
    //     {
    //         from: from,
    //         to: to,
    //         id: id.toString()
    //     }
    // )
    
});


