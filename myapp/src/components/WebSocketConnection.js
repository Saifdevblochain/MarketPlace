import { toast } from "wc-toast";
import {useEffect} from "react";

export default function useWebConnection () {

  const client = new WebSocket("ws://localhost:8888");

 useEffect(() => {
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
  return () => {
    client.close();
  };
 });
  
 return (
  client
 )
}
 