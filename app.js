const express = require("express")
const cors = require("cors")
const app = express();
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const url = "mongodb+srv://root:root@cluster0.kpkuzbh.mongodb.net/marketplace?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database connected ")
});

//schmea

// const dataSchema = new mongoose.Schema({
//     url: String,
//     address: String,
//     id: Number
// })

const nftsSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    nfts_collection: [Number],
})

const usersSchema = new mongoose.Schema({
    wallet: String,
})

// const Data = mongoose.model("data", dataSchema);
const Nfts = mongoose.model("nfts", nftsSchema);
const Users = mongoose.model("users", usersSchema);




app.post("/addUser", async () => {
    const checkWallet = await Users.findOne({ wallet: req.body.wallet });
    if (checkWallet) {
        return resp.status(200).json({ message: "User Exists" });
    } else {
        const addWallet = await Users.create({ wallet: req.body.wallet });
        await Nfts.create({ user: addWallet._id, nfts_collection: [] });
        return resp.status(200).json({ message: " User Added SuccessFully ! " })
    }
})

// app.post("/transfer",async(req,resp)=>{
//     const user1Wallet= await Users.findOne({wallet:req.body.fromwallet});
//     const user1Nfts= await Users.findOne({user: user1Wallet._id})

//     if(user1Nfts.collection.contains(req.body.id)){
//         user1Nfts.collection= await user1Nfts.collection.map((item)=>item!==req.body.id);
//         await user1Nfts.save();

//        const user2Wallet= await Users.findOne({wallet:req.body.toWallet});
//        const user2nfts= await Nfts.findOne({wallet:user2Wallet._id})

//        user2nfts.collection.push({req.body.id})
//        await user2nfts.save();
//        return resp.status().json({message:"Transferred"});
//     }else{
//         return resp.status(400).json({ nessage: "user does not own the toke ID" })
//     }
// })
 

app.post("/transfer", async (req, resp) => {

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






app.post('/mint', async (req, resp) => {
    console.log(req.body)
    try {
        await Data.create({ url: req.body.url, address: req.body.address, id: req.body.id })
        return resp.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "Something is wrong with the server" });

    }
})


// app.post("/mint", async (req, resp) => {
//     console.log(req.body)

//     try {
//         await Data.insertMany({ url: req.body.url, address: req.body.address, id: req.body.id })
//         return resp.status(200).json({ message: "Success" })
//     } catch (error) {
//         console.log(error)
//         return resp.status(500).json({ message: "Error" })
//     }
// })



app.post("/test", async (req, resp) => {
    try {
        await Nfts.create({ url: req.body.url })
        console.log(req.body.url)
    } catch (error) {
        console.log(error)
    }
})


app.post("/test", async (req, resp) => {
    try {
        const user = await Users.create({ address: req.body.address })
        u
        console.log(req.body.address)
    } catch (error) {
        console.log(error)
    }
});



app.post("/mint", async (req, resp) => {
    console.log(req.body)
    try {
        await Data.deleteOne({ id: 13 })
    } catch (error) {
        console.log(error)
    }
})


app.listen(5000)
