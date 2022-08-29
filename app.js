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
