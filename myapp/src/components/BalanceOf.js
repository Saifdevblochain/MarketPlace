import { toast } from "wc-toast";
import axios from "axios";
import React, { useState } from "react";
import "../App.css";

export default function BalanceOf() {
  const [addressInput, setAddressInput] = useState("");
  const [result, setResult] = useState("");

  async function Balance() {
    let res = await axios.post("http://localhost:5000/api/balanceOf", {
      address: addressInput,
    });
    setResult(res.data);
    
    console.log(res.data)
     
    toast.success(res.data);
  }

  return (
    <div>
      <span>Balance Of</span>
      <input
        type="text"
        placeholder="address"
        onChange={(e) => setAddressInput(e.target.value)}
      />
      <button className="button-85" onClick={Balance}>
        {" "}
        Check{" "}
      </button>
      <span> {result}</span>
    </div>
  );
}
