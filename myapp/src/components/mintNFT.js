import { toast } from "wc-toast";
import axios from "axios";
import React, {useState} from 'react'
import "../App.css";

export default function MintNFT( ) {
  const [addressTo, setAddressTo] = useState("");
  
  const mintNft = async () => {
  
      const res = await axios.post("http://localhost:5000/api/mint", {
        address: addressTo,
      });
      const message= res.data.message?? "Failed"
      toast.success(message);
    };
     
 return (
  <div>
  <span>Mint Your Tokens</span>

  <input type="text" placeholder="address"
    onChange={(data) => setAddressTo(data.target.value)} />

  <button className="button-85" onClick={mintNft }> Mint </button>

  <br></br> <br></br>
</div>
 );
}