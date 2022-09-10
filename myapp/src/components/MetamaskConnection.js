import React, { useRef, useState ,useEffect} from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import axios from "axios";

import { toast } from "wc-toast";

export default function MetamaskConnect() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  let signer, provider, web3Provider;
  const getProviderOrSigner = async (needSigner = false) => {
    provider = await web3ModalRef.current.connect();
    web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      signer = web3Provider.getSigner();
      
      return signer;
    }
    return web3Provider;
  };

 

  const connectWallet = async () => {
    try {
      if (!walletConnected) {
        // Assign the Web3Modal class to the reference object by setting it's `current` value
        // The `current` value is persisted throughout as long as this page is open
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        await getProviderOrSigner();
        setWalletConnected(true);
        signer = web3Provider.getSigner();
   
        let data= await signer.getAddress()
         setConnectedAddress(data);
       
          
      }
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
    } catch (err) {
      console.error(err);
    }
  };

  window.ethereum.on('accountsChanged', function ( ) {
    
    setConnectedAddress(null);
    setWalletConnected(false);
     });

     window.ethereum.on('chainChanged', ()=>{
      if (window.ethereum.chainId !== 4) {
        setWalletConnected(false);
        setConnectedAddress(null);
 
        throw new Error("Change network to Rinkeby");
      }
     
     });
     
   
    useEffect(() => {
     
      (async()=>{
        
       if(connectedAddress!==null){
        console.log(connectedAddress)
        const res = await  axios.post(
          "http://localhost:5000/api/adduser",
         { wallet:connectedAddress}
        );
        toast.success(res.data.message)
       }
      
       })()
  
      return () => {
         
      };
    }, [connectedAddress]);
    

  return (
    <div>
      <button onClick={connectWallet} className="button-85">   
        {!walletConnected ? "Connect" : "Connected"}
      </button>
      <span>{connectedAddress}</span>
    </div>
  );
}
