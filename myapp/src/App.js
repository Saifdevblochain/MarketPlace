 
import MintNFT from "./components/mintNFT"
import Transfer from './components/transfer';
import BalanceOf from './components/BalanceOf'
import "./App.css";
import useWebConnection from "./components/WebSocketConnection";
import MetamaskConnect from "./components/MetamaskConnection";
 

function App() {

  const { client } = useWebConnection();

  return (

    <div className="App">

      
    
         <wc-toast> </wc-toast>

      <h3> Centralized MarketPlace</h3>
      <MetamaskConnect/>
      
      <MintNFT />

      <Transfer />
      
      <BalanceOf />

    </div>
  );
}

export default App;
