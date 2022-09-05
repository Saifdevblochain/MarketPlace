const redis= require('redis')
const publisher = redis.createClient();
 
publisher.on('connect',()=>console.log("publisher connected"));


(async()=>{
    
    await publisher.connect();
  await publisher.publish('channel', "Hello from Publisher : data - sent");


})()