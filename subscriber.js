const redis= require('redis')
const subscriber = redis.createClient();

subscriber.on('connect',()=>{
  console.log('Connected')
});

  
(async()=>{
  await  subscriber.connect();
  await subscriber.subscribe('channel', (message) => {
    
    console.log(message); // 'message'
  });
  

})()