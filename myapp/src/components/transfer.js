import React, { useState } from "react";
import { toast } from "wc-toast";
import "../App.css";
import axios from "axios";

export default function Transfer(){

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
    

  const transferNft = async () => {
    console.log(transferData)
    const res = await axios.post("http://localhost:5000/api/transfer",  transferData);
    toast.success(res.data.message);
    console.log(res.data.message)
  };

    return(
        <div>
        
<div id="transfer">
<h3> Transfer your Tokens</h3>
<input type="text" name='From' placeholder="from" onChange={handleChange}/>
<input type="text" name='To' placeholder="to" onChange={handleChange}/>
<input type="number" name='Id' placeholder="id" onChange={handleChange}/>
<button className="button-85" onClick={transferNft}>  Transfer </button>
<br></br> <br></br>
</div>
        </div>
    )
}