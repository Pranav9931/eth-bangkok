import "./home.page.css"
import CarouselSlider from '../../components/carousel.component';
import { CarouselImg1 } from '../../assets';
import TicketsListing from "../../components/ticketlisting.component";

import ticketsData from '../tickets';
import { useStateContext } from "../../context";
import { useEffect } from "react";
const HomePage = () => {

    const { setActivePage } = useStateContext();
    useEffect(() => {
        setActivePage("home");
    }, [])

    const items = [
        {
            image: <img src={CarouselImg1} alt="item 4" />,
            caption: <div className="carousel-caption">Pragma Bangkok 2K24
                <div style={{ fontSize: '40px', margin: '10px 0', color: '#0090ff' }}>Starting 14th Nov</div>
                <div style={{ fontWeight: '400', fontSize: '15px' }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div></div>
        },
        {
            image: <img src={CarouselImg1} alt="item 4" />,
            caption: <div className="carousel-caption">Pragma Bangkok 2K24
                <div style={{ fontSize: '40px', margin: '10px 0', color: '#0090ff' }}>Starting 14th Nov</div>
                <div style={{ fontWeight: '400', fontSize: '15px' }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div></div>
        },
        {
            image: <img src={CarouselImg1} alt="item 4" />,
            caption: <div className="carousel-caption">Pragma Bangkok 2K24
                <div style={{ fontSize: '40px', margin: '10px 0', color: '#0090ff' }}>Starting 14th Nov</div>
                <div style={{ fontWeight: '400', fontSize: '15px' }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div></div>
        },
        {
            image: <img src={CarouselImg1} alt="item 4" />,
            caption: <div className="carousel-caption">Pragma Bangkok 2K24
                <div style={{ fontSize: '40px', margin: '10px 0', color: '#0090ff' }}>Starting 14th Nov</div>
                <div style={{ fontWeight: '400', fontSize: '15px' }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div></div>
        },
        {
            image: <img src={CarouselImg1} alt="item 4" />,
            caption: <div className="carousel-caption">Pragma Bangkok 2K24
                <div style={{ fontSize: '40px', margin: '10px 0', color: '#0090ff' }}>Starting 14th Nov</div>
                <div style={{ fontWeight: '400', fontSize: '15px' }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div></div>
        },
    ];

    return (
        <div>
            <CarouselSlider items={items} />
            <div className="home-container">
                <div className="page-title" style={{ margin: '20px 0 0 0' }}><center>Book your tickets now</center></div>
                <div style={{ margin: '15px 0', color: '#0090ff' }}>
                    <center>The upcoming events and tickets.</center></div>
                <div className="tickets-navlinks">

                    <ul>
                        <li className="active"><a href="#">Upcoming</a></li>
                        <li><a href="#">Past Events</a></li>
                        <li><a href="#">Tickets</a></li>
                    </ul>
                </div>
                <div className="tickets-listing-container">

                    <TicketsListing
                        tickets={ticketsData}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default HomePage