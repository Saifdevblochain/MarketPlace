const express = require("express")
const cors = require("cors")
const { API_ROUTER } = require("./api");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const { connectDB } = require('./db/mongo');

const url = process.env.URL;
(async () => {
    const isConnected = await connectDB(url);

    app.use("/api", API_ROUTER)

    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Listening to HTTP after mongodb connection on PORT ${PORT}`)
        })
    }
})();














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






// app.post("/mint", async (req, resp) => {
//     console.log(req.body)
//     try {
//         await Data.deleteOne({ id: 13 })
//     } catch (error) {
//         console.log(error)
//     }
// })
