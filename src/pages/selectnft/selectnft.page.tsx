import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ticketsData from '../tickets';


import "./selectnft.page.css"
import TicketsListing from '../../components/ticketlisting.component';
const SelectNFT = () => {

    const location = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    const navigate = useNavigate();
    function formatPrice(price: number) {
        const formattedPrice = price.toFixed(2);
        return `${formattedPrice} CHL`;
    }

    function formatUSDPrice(price: number) {
        const formattedUSDPrice = (price * 1.2).toFixed(2);
        return `≈ ${formattedUSDPrice} USD`;
    }
    type Data = {
        imgUrl: string
    }[]

    const [activeNFT, setActiveTicket] = useState(0);

    const [nftTicket, setNFTTicket] = useState<Data>([]);

    const handleClick = (id: number) => {
        setActiveTicket(() => id)
    }

    const handleBtnClick = () => {
        navigate(`../bookticket/${stateData.id}/${activeNFT}`, { state: { ...stateData, nftTicket: nftTicket[activeNFT] } });
    }
    useEffect(() => {
        const fetchNFTs = async () => {
            const nfts = await fetch("https://bafybeidtj7pieladrjf5r4qas3756ue6w6dy3nyegqzuhvjkbkkxyxbxce.ipfs.w3s.link/nftTicketsURL.json");
            const nft = await nfts.json();
            const data = nft.images;
            setNFTTicket(() => data);
            console.log(nftTicket);
        }
        fetchNFTs();
    }, [])

    const stateData = location.state;
    return (
        <div className="nfttickets-container">
            <div className="nfttickets-container-card" id="selectNFT">
                <div className="nfttickets-container-card-details">
                    <img src={stateData.imageSrc} />
                    <div>
                        <div className="page-title">
                            Match Details
                        </div>
                        <div style={{ margin: '15px 0', color: '#ffffff50' }}>
                            The match day weather predictions.</div>

                        <div className="nfttickets-container-card-details-weather">
                            Weather Condition: Clear Sky
                            <div> Dew Factor: 1.2%</div>
                            <div> Winds: 30 miles/sec - 8.5<sup>o</sup> N-E</div>
                        </div>

                        <div className="nfttickets-container-card-details-match">
                            <div className="page-title"> {stateData.title}</div>
                            <div>{stateData.date}</div>
                            <div>Location: {stateData.country}
                                <div style={{ margin: '5px 0', color: '#0090ff', fontSize: '10px' }}>
                                    The location is shown as country codes.</div>
                            </div>

                            <div>{stateData.date}</div>

                            <div className="page-title" style={{ color: '#0090ff' }}>
                                Price
                            </div>
                            <span style={{ color: '#0090ff' }}>
                                {stateData.price} <span>CHL</span>
                                <span style={{ color: '#ffffff60', fontSize: '12px' }}> {formatUSDPrice(stateData.price)}</span>
                            </span>

                        </div>

                    </div>
                </div>


                <div className="nfttickets-container-card-choose-nft-container">
                    <div className="page-title">Choose NFT</div>
                    <div style={{ margin: '15px 0', color: '#0090ff' }}>
                        Choose any NFT of your choice.</div>

                    <div className="nft-tickets-wrapper">
                        {nftTicket.map((item, _idx): any => {
                            return (
                                <div className={`${activeNFT === _idx ? "activeNFT" : "nftTicketCard"}`} style={{ cursor: 'pointer' }} onClick={() => handleClick(_idx)}>
                                    <img src={item.imgUrl} />
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ alignSelf: 'end' }}>
                        <button className="btn-connect" onClick={() => handleBtnClick()}>Continue</button>
                    </div>
                </div>
            </div>
            <div className="page-title" style={{ margin: '20px 0 0 0' }}>Explore more Such Events</div>
            <div style={{ margin: '15px 0', color: '#0090ff' }}>
                The upcoming ICC events and tickets.</div>
            <div className="tickets-listing-container">

                <TicketsListing
                    tickets={ticketsData.slice(0, 9)}
                />
            </div>
            <center>
                <button className="btn-connect" onClick={() => navigate("/")}>Explore More</button>
            </center>
        </div>
    )
}

export default SelectNFT