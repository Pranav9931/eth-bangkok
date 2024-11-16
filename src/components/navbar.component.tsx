import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.component.css"

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Logo } from '../assets';
import { useStateContext } from '../context';

const NavbarComponent = () => {

    const { activePage } = useStateContext();

    

    const navigate = useNavigate();
    const ProfileArea = () => {
        return (
            <DynamicWidget />
        )
    }
    return (
        <div className="navbar-container">
            <div className="logo">
                <img src={Logo} onClick={() => navigate("./")} />
                <div className="nav-links">
                    <li className={activePage === "home" ? "active" : ""} onClick={() => navigate("./")}>Home</li>
                    <li className={activePage === "yourtickets" ? "active" : ""} onClick={() => navigate("./tickets")}>Your Tickets</li>
                    <li className={activePage === "recenttickets" ? "active" : ""} onClick={() => window.location.href = "https://spicy-explorer.chiliz.com/"} >Chiliz Scan</li>
                </div>
            </div>
            <div className="walletArea">
                {ProfileArea()}
            </div>
        </div>
    )
}

export default NavbarComponent