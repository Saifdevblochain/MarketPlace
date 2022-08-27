const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection Established")
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

mongoose.connection.on("error", () => {
    console.log(error)
    process.abort();
})


const nftsSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    nfts_collection: [Number],
})

const usersSchema = new mongoose.Schema({
    wallet: String,
})

const marketplaceSchema = new mongoose.Schema({
    forSaleIds: [Number],
})


const Nfts = mongoose.model("nfts", nftsSchema);
const Users = mongoose.model("users", usersSchema);
const Marketplace = mongoose.model("markets", marketplaceSchema)

module.exports = { connectDB, Nfts, Users, Marketplace }