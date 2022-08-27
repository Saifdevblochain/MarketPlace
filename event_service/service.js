const { ethers, Contract } = require("ethers");
const { connectDB, Users, Nfts, Marketplace } = require('../db/mongo')
const abi = require("./abi.json")
require("dotenv").config()

const rpcUrl = process.env.rpcUrl;
const deployedAddress = process.env.deployedAddress;
const privatekey = process.env.privatekey;
const url = process.env.URL;

const from = "0xaF09B9535E239AaDcC2B96331341647F84a3537f";
const to = "0x34136d58CB3ED22EB4844B481DDD5336886b3cec";
let provider = ethers.getDefaultProvider(rpcUrl); //rpc url is from Alchemy: testnet that you used

const wallet = new ethers.Wallet(privatekey, provider);
const contract = new ethers.Contract(deployedAddress, abi, provider);
let contractWithSigner = contract.connect(wallet);
// ... OR ...
// let contractWithSigner = new Contract(deployedAddress, abi, wallet);


contract.on("Transfer", async (from, to, _id) => {

    const id = parseInt(_id.toString());
    const toUser = await Users.findOne({ wallet: to });
    const toNfts = await Nfts.findOne({ user: toUser._id });

    if (from === '0x0000000000000000000000000000000000000000') {
        // add id to the users nft_collection
        toNfts.nfts_collection.push(id);
        await toNfts.save();
    }
    else {
        const fromUser = await Users.findOne({ wallet: from });
        const fromNfts = await Nfts.findOne({ user: fromUser._id })

        fromNfts.nfts_collection = fromNfts.nfts_collection.filter(item => item != id)
        await fromNfts.save();

        toNfts.nfts_collection.push(id)
        await toNfts.save()

    }

    console.log(
        {
            from: from,
            to: to,
            id: id.toString()
        }
    )
});


(async () => {

    try {
        const isConnected = await connectDB(url)

        // !isConnected && (process.abort()); // Short circuit

        if (!isConnected) {
            process.abort();
        }


        let mint = await contractWithSigner.mintNFT(from);
        console.log("Mint is :", mint);


        const Name_ = await contract.name()
        console.log("name of NFT is :", Name_)


        // await contract.transferFrom(from, to, 1);


        let bal = await contract.balanceOf(from);
        console.log("balanceOf is", bal.toString())

        // let ownerOf = await contract.ownerOf(1);
        // console.log("ownerOf Token id 1 is :", ownerOf);

    } catch (error) {
        console.log(error)
    }
})
    ()

