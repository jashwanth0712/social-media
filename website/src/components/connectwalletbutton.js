import React, { useState } from 'react';
import "../App.css"
const ConnectWalletButton = () => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const connectWithMetaMask = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    if (accounts.length > 0) {
                        const selectedAccount = accounts[0];
                        setConnectedAccount(selectedAccount);
                        setIsConnected(true);

                        // Fetch the account balance
                        window.ethereum
                            .request({
                                method: 'eth_getBalance',
                                params: [selectedAccount, 'latest'],
                            })
                            .then((balance) => {
                                // Convert the balance from wei to ether
                                const etherBalance = window.web3.utils.fromWei(balance, 'ether');
                                setBalance(etherBalance);

                                console.log('Connected account:', selectedAccount);
                                console.log('Account balance:', etherBalance, 'ETH');
                            })
                            .catch((error) => {
                                console.error('Error fetching balance:', error);
                            });
                    } else {
                        console.error('No accounts connected');
                    }
                })
                .catch((error) => {
                    console.error('Error connecting with MetaMask:', error);
                });
        } else {
            console.error('MetaMask is not available');
        }
    };

    const disconnectFromMetaMask = () => {
        window.ethereum
            .request({ method: 'eth_accounts' })
            .then((accounts) => {
                if (accounts.length > 0) {
                    window.ethereum.request({ method: 'eth_requestAccounts' });
                }
                setIsConnected(false);
                setConnectedAccount('');
                setBalance('');
            });
    };

    return (
        <div style={{display:"flex" ,flexDirection:"row-reverse"}}>
            {!isConnected ? (
                <button className="button-36" onClick={connectWithMetaMask}>Connect with MetaMask</button>
            ) : (
                <button className="button-36" onClick={disconnectFromMetaMask}>Disconnect</button>
            )}
            <button className='button-23'>
            {connectedAccount && <p  >{connectedAccount.slice(0, 6)}...{connectedAccount.slice(-3)}</p>}

            </button>
        </div>
    );
};

export default ConnectWalletButton;
