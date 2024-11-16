import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.component.css"

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Logo } from '../assets';

const NavbarComponent = () => {

    const navigate = useNavigate();
    const ProfileArea = () => {
        return (
            <DynamicContextProvider
                settings={{
                environmentId: '3466c161-f1bc-404f-ab4a-3eef2366141d',
                walletConnectors: [ EthereumWalletConnectors ],
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