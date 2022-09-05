const {createClient} =require("redis")

const client = createClient();

client.on('error',err=> console.error(err))

client.on('connect',()=>{console.log("Client Connected")});

(async()=>{
    await client.connect();

await client.set('key', 'Saif');
const value = await client.get('key')
console.log(`value is ${value}`);



// await client.hSet('key1', 'field','valll','field2','value2');
// const a= await client.hGetAll('key1'); // { field1: 'value1', field2: 'value2' }
// console.log(a);
// const b= await client.hVals('key1'); // ['value1', 'value2']
// console.log(b);


// await client.set('key3', 'Key-3-Value', {
//     EX: 10,
//     NX: true
//   });

//   const vall= await client.get('key3')
//   console.log(`Value of key3 is ${vall}`)


//   setTimeout(async()=>{
//     const vall= await client.get('key3')
//     console.log(`Value of key3 10 second is ${vall}`)
  
//   },10000)


})()
 