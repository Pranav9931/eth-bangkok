import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.component.css"

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { Logo } from '../assets';
import { useStateContext } from '../context';
import styled from 'styled-components';
const FanPointSection = styled.div`
    display: flex;
    background: #0090ff20;
    border-radius: 50px;
    padding: 15px 20px;
    color: #0090ff;
    gap: 10px;
`

const NavbarComponent = () => {

    const { activePage, address, contractAddress } = useStateContext();

    const [fanPoints, setFanPoints] = useState(null);

    const callRewardPointAPI = async () => {
        if (address) {
            try {
                const response = await fetch("https://df67-49-231-195-19.ngrok-free.app/fan-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ wallet_address: address }), // Wrap address in an object
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log(data); // Process the received response
                setFanPoints(data)
            } catch (err) {
                console.error("Error calling reward point API:", err);
            }
        } else {
            console.error("No address provided");
        }
    };
    

    useEffect(() => {
        callRewardPointAPI()
    }, [address])

    const navigate = useNavigate();
    const ProfileArea = () => {
        return (
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            {fanPoints && <FanPointSection>FAN POINTS: {fanPoints}</FanPointSection>}
            <DynamicWidget />
            </div>
        )
    }
    return (
        <div className="navbar-container">
            <div className="logo">
                <img src={Logo} onClick={() => navigate("./")} />
                <div className="nav-links">
                    <li className={activePage === "home" ? "active" : ""} onClick={() => navigate("./")}>Home</li>
                    <li className={activePage === "yourtickets" ? "active" : ""} onClick={() => navigate("./tickets")}>Your Tickets</li>
                    <li className={activePage === "recenttickets" ? "active" : ""} onClick={() => window.location.href = `https://spicy-explorer.chiliz.com/address/${contractAddress}`} >Chiliz Scan</li>
                </div>
            </div>
            <div className="walletArea">
                {ProfileArea()}
            </div>
        </div>
    )
}

export default NavbarComponent