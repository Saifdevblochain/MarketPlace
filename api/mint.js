const express = require('express');
const { ethers, Contract } = require("ethers");
require("dotenv").config()
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');
const abi = require("./abi.json")
const mintRouter = express.Router();
const rpcUrl = process.env.rpcUrl;
const deployedAddress = process.env.deployedAddress;
const privatekey = process.env.privatekey;
const url = process.env.URL;

// const from = "0xaF09B9535E239AaDcC2B96331341647F84a3537f";
// const to = "0x34136d58CB3ED22EB4844B481DDD5336886b3cec";
let provider = ethers.getDefaultProvider(rpcUrl); //rpc url is from Alchemy: testnet that you used

const wallet = new ethers.Wallet(privatekey, provider);
const contract = new ethers.Contract(deployedAddress, abi, provider);
let contractWithSigner = contract.connect(wallet);
// ... OR ...
// let contractWithSigner = new Contract(deployedAddress, abi, wallet);

mintRouter.post("/", async (req, resp) => {
    const isConnected = await connectDB(url)
    // !isConnected && (process.abort()); // Short circuit

    if (!isConnected) {
        process.abort();
    }
    let {from}= req.body
    console.log(from)
    
    let mint = await contractWithSigner.mintNFT(from);
   
   
})

module.exports = { mintRouter }


