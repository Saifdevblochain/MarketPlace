import { toast } from 'wc-toast';
import React,{useState}from "react"
import './App.css';
import axios from 'axios'
 
 function App() {
  const [addressTo,setAddressTo]= useState("")
  const client= new WebSocket("ws://localhost:8888");

  client.onmessage=(event)=>{
      const data = JSON.parse(event.data);
      if (data.status === 'New')
       {
       toast.success(`New token is minted with id ${data.id}`);
       console.log(`New token is minted with id ${data.id}`)
      }
      else
      {
        toast.success(`NFT of Token ID ${data.id} Transferred`);
        console.log(`NFT of Token ID ${data.id} Transferred`);
      }
    };
    // var itemRouter = require('express').Router({ mergeParams: true }); 


    // axios.get(url, { address: addressTo }
    const minting = async() => {
      console.log(addressTo)
     
     const res= await axios.post("http://localhost:5000/mint/mintRouter", { address: addressTo })
          console.log(res)

          }
  



  return (
    <div className="App">
       <wc-toast></wc-toast>
      <h3> Centralized MarketPlace</h3>

      <div >
      
<span>Mint Your Tokens</span>  
 <input type="text" placeholder="address" onChange={(data)=>setAddressTo(data.target.value)}/> 
<button className="button-85" onClick={minting} >Mint</button>
<br></br> <br></br>
</div>

<div id="transfer">
  <h3> Transfer your Tokens</h3>
   <input type="text" placeholder="from" />
 <input type="text" placeholder="to" />
 <input type="number" placeholder="id" />
 <button className="button-85"> Transfer </button>
 <br></br> <br></br>
 </div>

<div > 
<span>Balance Of</span> <input type="text" placeholder="address" />
<button className="button-85"> Check  </button>

</div>


    </div>
  );
}

export default App;


