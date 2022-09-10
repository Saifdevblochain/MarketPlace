const express = require('express');
const { ethers, Contract } = require("ethers");
require("dotenv").config()
const { connectDB, Nfts, Users, Marketplace } = require('../db/mongo');
const abi = require("./abi.json")
const BalanceOf = express.Router();
const rpcUrl = process.env.rpcUrl;
const deployedAddress = process.env.deployedAddress;
const privatekey = process.env.privatekey;
const url = process.env.URL;
 
let provider = ethers.getDefaultProvider(rpcUrl); //rpc url is from Alchemy: testnet that you used

const wallet = new ethers.Wallet(privatekey, provider);
const contract = new ethers.Contract(deployedAddress, abi, provider);
let contractWithSigner = contract.connect(wallet);
// ... OR ...
// let contractWithSigner = new Contract(deployedAddress, abi, wallet);

BalanceOf.post("/", async (req, resp) => {
    const isConnected = await connectDB(url)
    !isConnected && (process.abort()); // Short circuit

    let address= req.body.address
    console.log(address)
    
    let balanceOfAddress = await contractWithSigner.balanceOf(address);
    return resp.send(balanceOfAddress.toString())

    
    
   
})

module.exports = { BalanceOf }


