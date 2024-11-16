import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.component.css"

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Logo } from '../assets';

const NavbarComponent = () => {

    const evmNetworks = [
        {
          blockExplorerUrls: ['https://spicy-explorer.chiliz.com/'],
          chainId: 88882,
          chainName: 'Chiliz Spicy Testnet',
          iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
          name: 'Chiliz',
          nativeCurrency: {
            decimals: 18,
            name: 'Chiliz',
            symbol: 'CHL',
            iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
          },
          networkId: 88882,
      
          rpcUrls: ['https://spicy-rpc.chiliz.com'],
          vanityName: 'Chiliz Spicy Testnet',
        },
    ]

    const navigate = useNavigate();
    const ProfileArea = () => {
        return (
            <DynamicContextProvider
                settings={{
                walletConnectors: [EthereumWalletConnectors],
                environmentId: '3466c161-f1bc-404f-ab4a-3eef2366141d',
                overrides:  { evmNetworks } ,
            }}>
                <DynamicWidget />
            </DynamicContextProvider>
        )
    }
    return (
        <div className="navbar-container">
            <div className="logo">
                <img src={Logo} onClick={() => navigate("./")} />
                <div className="nav-links">
                    <li onClick={() => navigate("./")}>Home</li>
                    <li onClick={() => navigate("./tickets")}>Your Tickets</li>
                    <li onClick={() => window.location.href = ""} >Chiliz Scan</li>
                </div>
            </div>
            <div className="walletArea">
                {ProfileArea()}
            </div>
        </div>
    )
}

export default NavbarComponent