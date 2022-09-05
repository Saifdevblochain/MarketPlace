const express = require("express")
const cors = require("cors")
const redis= require('redis')
const subscriber= redis.createClient();
const WebSocket= require('ws')
const { API_ROUTER } = require("./api");
const app = express();
const {json} = require('body-parser')

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(json())
app.use(cors())

const wss= new WebSocket.Server({
    port:8888

})

wss.on('connection',(ws)=>{
    console.log("websocket connection!!");
});


const { connectDB } = require('./db/mongo');

const url = process.env.URL;
(async () => {
    await subscriber.connect();

 subscriber.subscribe('message',(data)=>{
        console.log(data)
        wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                        client.send(data.toString())
                    }
                })
            })
            
    const isConnected = await connectDB(url);

    app.use("/api", API_ROUTER)

    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Listening to HTTP after mongodb connection on PORT ${PORT}`)
        })
    }
})();
