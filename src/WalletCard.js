import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { ethers } from 'ethers';

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                setIsLoading(true);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setDefaultAccount(account);

                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await ethersProvider.getBalance(account);
                setUserBalance(ethers.utils.formatEther(balance));
                setIsLoading(false); 
            } catch (error) {
                setErrorMessage("Failed to connect wallet: " + error.message);
                setIsLoading(false);
            }
        } else {
            setErrorMessage("Please install Metamask!");
        }
    };

    const disconnectWalletHandler = () => {
        setDefaultAccount(null);
        setUserBalance(null);
        setErrorMessage(null);
    };

    useEffect(() => {
        document.body.style.margin = '0';
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.heading}>ETH Wallet Adapter</h3>
                <Button
                    variant="contained"
                    style={{
                        ...styles.button,
                        backgroundColor: defaultAccount ? "#A5CC82" : "#4CAF50",
                    }}
                    onClick={defaultAccount ? disconnectWalletHandler : connectWalletHandler}
                >
                    {defaultAccount ? "Disconnect Wallet" : "Connect Wallet"}
                </Button>
                <div style={styles.displayAccount}>
                    <h4 style={styles.walletAddress}>Address: {defaultAccount || "Not connected"}</h4>
                    {isLoading ? (
                        <CircularProgress style={{ marginTop: '10px' }} />
                    ) : (
                        defaultAccount && (
                            <div style={styles.balanceDisplay}>
                                <h3 style={styles.balanceText}>Wallet Balance: {userBalance} ETH</h3>
                            </div>
                        )
                    )}
                </div>
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #c3ec52, #0ba29d)',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
    },
    heading: {
        color: '#333',
        marginBottom: '20px',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '24px',
    },
    button: {
        color: 'white',
        fontSize: '18px',
        padding: '12px 24px',
        borderRadius: '30px',
        marginBottom: '20px',
        cursor: 'pointer',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
    },
    displayAccount: {
        marginTop: '20px',
    },
    walletAddress: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
    },
    balanceDisplay: {
        marginTop: '10px',
    },
    balanceText: {
        fontSize: '18px',
        color: '#2E7D32',
    },
    errorMessage: {
        color: 'red',
        marginTop: '20px',
    },
};

export default WalletCard;
