import React, { useState ,useEffect} from 'react';
import "../App.css"
import abi from "../erc20abi.json"
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0xe461b5F215eBa41431D03ac890b55c0c61e4D3Dd'; // Replace with your contract address
const adfluenceContract = new ethers.Contract(contractAddress, abi, provider.getSigner());
// Function to create a new post
const createPost = async (content) => {
    const transaction = await adfluenceContract.createPost(content);
    await transaction.wait();
};

// Function to add a comment to a post
const addComment = async (postId, content) => {
    const transaction = await adfluenceContract.addComment(postId, content);
    await transaction.wait();
};

// Function to like a post
const likePost = async (postId) => {
    const transaction = await adfluenceContract.likePost(postId);
    await transaction.wait();
};

// Function to retweet a post
const retweetPost = async (postId) => {
    const transaction = await adfluenceContract.retweetPost(postId);
    await transaction.wait();
};

// Function to send a message
const sendMessage = async (receiver, content) => {
    const transaction = await adfluenceContract.sendMessage(receiver, content);
    await transaction.wait();
};

// Function to create a new user
const createUser = async (_username, _fullName, _bio, _profilePicture, _bannerImage) => {
    const transaction = await adfluenceContract.createUser(_username, _fullName, _bio, _profilePicture, _bannerImage);
    await transaction.wait();
};

const ConnectWalletButton = () => {
    const [postId,setpostId]=useState(null);
    const [receiver,setreciever]=useState("");
    const [connectedAccount, setConnectedAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);
// Add this code at the beginning of your component
useEffect(() => {
    // Check if there's a selected account in local storage
    const storedAccount = localStorage.getItem('selectedAccount');

    if (storedAccount) {
        // Set the stored account in the component state
        setConnectedAccount(storedAccount);
        setIsConnected(true);
    }
}, []);
    const connectWithMetaMask = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    if (accounts.length > 0) {
                        const selectedAccount = accounts[0];
                        setConnectedAccount(selectedAccount);
                        setIsConnected(true);
    
                        // Store the selected account in local storage
                        localStorage.setItem('selectedAccount', selectedAccount);
    
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
        <div>

        <div style={{display:"flex" ,flexDirection:"row-reverse"}}>
            {!isConnected ? (
                <button className="button-36" onClick={connectWithMetaMask}>Connect with MetaMask</button>
                ) : (
                    <button className="button-36" onClick={disconnectFromMetaMask}>Disconnect</button>
                    )}
           {connectedAccount && <button className='button-23'>
             <p  >{connectedAccount.slice(0, 6)}...{connectedAccount.slice(-3)}</p>
            </button>}
        </div>
{/* <button className="button-36" onClick={() => createPost("Your post content")}>Create Post</button>
<button className="button-36" onClick={() => addComment(postId, "Your comment content")}>Add Comment</button>
<button className="button-36" onClick={() => likePost(postId)}>Like Post</button>
<button className="button-36" onClick={() => retweetPost(postId)}>Retweet Post</button>
<button className="button-36" onClick={() => sendMessage(receiver, "Your message content")}>Send Message</button>
<button className="button-36" onClick={() => createUser("Username", "Full Name", "Bio", "Profile Pic", "Banner Image")}>Create User</button> */}

    </div>
    );
};

export default ConnectWalletButton;
