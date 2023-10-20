import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from 'react';
import Main from "./components/main/main";
import NavBar from "./components/navBar/navbar";
import Right from "./components/right/right";
import abi from "./erc20abi.json"
import { ethers } from 'ethers';

import ConnectWalletButton from './components/connectwalletbutton';
function App() {
  const [isConnected, setIsConnected] = useState(false);

  // Check for the selected account in local storage on component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem('selectedAccount');
    if (storedAccount) {
      setIsConnected(true);
    }
  }, []);

  return (
    <div id="container">
      {
        isConnected &&
        <>
        <div id="nav-box">
        <NavBar />
      </div>
      <Main />
      <Right />
        </>
      }
      {/* {isConnected && <ConnectWalletButton />} */}

    </div>
  );
}

export default App;