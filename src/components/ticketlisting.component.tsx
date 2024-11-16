import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Ticket {
  id: string;
  imageSrc: string;
  title: string;
  date: string;
  country: string;
  price: number;
}

interface TicketsListingProps {
  tickets: Ticket[];
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  padding: 16px;
  width: 200px;
  margin: 16px;
  gap: 5px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    background: #1a1a1a;
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: #999;
`;

const Country = styled.span`
  font-size: 12px;
  color: #999;
  background: #0090ff20;
  border-radius: 20px;
  color: #0090ff;
  padding: 10px;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const PriceToken = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #0090ff;
`;

function TicketsListing({ tickets }: TicketsListingProps) {
  const navigate = useNavigate();

  function handleClick(ticket: Ticket) {
    navigate(`/tickets/${ticket.id}#`, { state: ticket });
  }

  function formatPrice(price: number) {
    const formattedPrice = price.toFixed(2);
    return `${formattedPrice} CHZ`;
  }

  function formatUSDPrice(price: number) {
    const formattedUSDPrice = (price * 1.2).toFixed(2);
    return `≈ ${formattedUSDPrice} USD`;
  }

  return (
    <>
      {tickets.map((ticket) => (
        <Card key={ticket.id} onClick={() => handleClick(ticket)}>
          <Image src={ticket.imageSrc} />
          <div>
            <Title>{ticket.title}</Title>
            <div className="flex">
              <Date>{ticket.date}</Date>
              <Country>{ticket.country}</Country>
            </div>
          </div>
          <Price>
            Price
            <br />
            <span>
              <PriceToken>{formatPrice(ticket.price)}</PriceToken>
              <span style={{ opacity: 0.5, fontSize: '10px' }}> {formatUSDPrice(ticket.price)}</span>
            </span>
          </Price>
        </Card>
      ))}
    </>
  );
}

TicketsListing.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};


export default TicketsListing;