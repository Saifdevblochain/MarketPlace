import { toast } from "wc-toast";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [addressTo, setAddressTo] = useState("");
  const [transferData,setTransferData]= useState({
    From:"",
    To :"",
    Id:""
  })
  
  const handleChange = e => {
    const { name, value } = e.target
    setTransferData({
        ...transferData,
        [name]: value
    })
}

  const client = new WebSocket("ws://localhost:8888");

  client.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.status === "New") {
      toast.success(`New token is minted with id ${data.id}`);
      console.log(`New token is minted with id ${data.id}`);
    } else {
      toast.success(`NFT of Token ID ${data.id} Transferred`);
      console.log(`NFT of Token ID ${data.id} Transferred`);
    }
  };

  const mintNft = async () => {
    const res = await axios.post("http://localhost:5000/api/mint", {
      address: addressTo,
    });
    toast.success(res.data.message);
  };

  const transferNft = async () => {
    console.log(transferData)
    const res = await axios.post("http://localhost:5000/api/transfer",  transferData);
    toast.success(res.data.message);
    console.log(res.data.message)
  };

  return (
    <div className="App">
      <wc-toast></wc-toast>
      <h3> Centralized MarketPlace</h3>

      <div>
        <span>Mint Your Tokens</span>
        <input
          type="text"
          placeholder="address"
          onChange={(data) => setAddressTo(data.target.value)}
        />
        <button className="button-85" onClick={mintNft}>
          Mint
        </button>
        <br></br> <br></br>
      </div>

      <div id="transfer">
        <h3> Transfer your Tokens</h3>
        <input type="text" name='From' placeholder="from" onChange={handleChange}/>
        <input type="text" name='To' placeholder="to" onChange={handleChange}/>
        <input type="number" name='Id' placeholder="id" onChange={handleChange}/>
        <button className="button-85" onClick={transferNft}>  Transfer </button>
        <br></br> <br></br>
      </div>

      <div>
        <span>Balance Of</span> <input type="text" placeholder="address" />
        <button className="button-85"> Check </button>
      </div>
    </div>
  );
}

export default App;
