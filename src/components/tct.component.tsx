import React, { useEffect, useState } from 'react'
import "./tct.component.css";

import { useLocation, useNavigate } from 'react-router-dom';

import Barcode from 'react-barcode';
import { WalletLogo } from '../assets';

const Ticket = ({ propVal, imgUrl }: any) => {

    // const [form, setForm] = useState([])
    // const [imgUrl, setImgUrl] = useState("")

    const handleChange = () => { }

    const handleSubmit = () => { }

    const navigate = useNavigate();

    const handlePayment = async () => {
        // const _type = ticketNumber === 0 ? "STANDARD" : "PREMIUM";
        // const _amount = ticketNumber === 0 ? `${propVal.price}` : `${propVal.price + 3}`;
        // const _imgUrl = imgUrl;
        // if (address) {
        //     const data = await addTicket(_amount, _type, _imgUrl);
        //     console.log("Transaction Successful", data);
        //     navigate("../success");
        // } else {
        //     alert("Connect your wallet first")
        // }

    }

    const [value, setValue] = useState('');

    // useEffect(() => {

    //     const data = String(Math.random())
    //     const price = ticketNumber === 0 ? propVal.price + `${data.slice(1, 7)}` : (propVal.price + 3) + `${data.slice(1, 7)}`;

    //     const val = `${address ? address.slice(1, 10) : "0x0000000000000000"}${address ? address.slice(-10,) : "0000000000"}`
    //     setValue(() => val);
    // }, [address, ticketNumber])


    return (
        <div className="tct">
            <span className='page-title'>
                Your Ticket
            </span>
            <div style={{ margin: '15px 0', color: '#0090ff' }}>
                The ticket shown below isn't final, you will get your ticket post payment.
            </div>

            <div className="ticketCard" style={{ padding: '10px' }}>
                <img src={imgUrl} style={{ borderRadius: '10px' }} className="tct-img" />
                <div className="ticket-details">
                    <div className='page-title'>
                        {propVal.title}
                    </div>
                    <div className='primary' style={{ borderRadius: '5px' }}>
                        Date: {propVal.date}
                        <br />
                        Place: {propVal.country}
                    </div>
                    <div style={{ opacity: '0.3' }}>
                        Witness two rivals facing each other on {propVal.date}
                    </div>
                    <div className="wrapper" style={{ flex: 1, alignSelf: 'end' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>Address</div>
                            <div className="box-details">
                                {/* {address ? address.slice(0, 3) + "..." + address.slice(-5,) : "0x0"} */}
                            </div>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>Price</div>
                            <div className="box-details">
                                {/* {ticketNumber === 0 ? `${propVal.price}` : `${propVal.price + 3}`} CHL */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="barcode-container">
                    <Barcode value={value} />
                </div>

            </div>
            <br />
            <span className='page-title'>
                Account Details
            </span>
            <div style={{ margin: '15px 0', color: '#0090ff' }}>
                Fill the details below to create an account.
            </div>


            <div className="account-details-container">
                <div className="accounts-details">
                    <div className="page-title">Personal Information</div>
                    <div style={{ margin: '15px 0', color: '#0090ff' }}>
                        Fill some personal info.
                    </div>
                    <form onSubmit={() => handleSubmit()}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                onChange={() => handleChange()}
                            />
                        </label>

                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                onChange={() => handleChange()}
                            />
                        </label>

                        <label>
                            Email Address:
                            <input
                                type="email"
                                name="email"
                                onChange={() => handleChange()}
                            />
                        </label>

                        <label>
                            Mobile Number:
                            <input
                                type="tel"
                                name="mobileNumber"
                                onChange={() => handleChange()}
                            />
                        </label>
                    </form>
                </div>

                {/* add any other necessary fields here */}
                <div className="ticket-booking-payment-options">
                    <div className="page-title">Payment Options</div>
                    <div style={{ margin: '15px 0', color: '#0090ff' }}>
                        Select your payment mode.
                    </div>
                    <div className="ticket-booking-payment-options-cards">
                        Wallet Payments
                        <div style={{ margin: '5px 0', color: '#ffffff30', fontSize: '12px' }}>
                            Choose from the given wallets given below.
                        </div>
                        <div className="wallet-container">
                            <div className="wallet-container-img-div" onClick={() => handlePayment()}>
                                <img src={WalletLogo} />
                            </div>
                        </div>
                    </div>
                    <div className="ticket-booking-payment-options-cards">
                        Debit/Credit Card Payments
                        <div style={{ margin: '5px 0', color: '#ffffff30', fontSize: '12px' }}>
                            Enter your details below carefully.
                        </div>
                        <div className="card">
                            <div className="card__front">
                                <label>
                                    Card Number:
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder='1234 5678 9012 3456'
                                        onChange={() => handleChange()}
                                    />
                                </label>
                                <label>
                                    Cardholder Name:
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder='John Doe'
                                        onChange={() => handleChange()}
                                    />
                                </label>
                                <div className="card__exp-cvv">
                                    <label>
                                        Expiration:
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder='01/23'
                                            onChange={() => handleChange()}
                                        />
                                    </label>
                                    <label>
                                        CVV:
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder='123'
                                            onChange={() => handleChange()}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className='btn-connect' style={{ margin: '10px 0 0 0', width: '100%' }} onClick={() => handlePayment()}>Book Ticket</button>

                    </div>
                    <div className="ticket-booking-payment-options-cards">
                        Other Payment Options
                        <div style={{ margin: '5px 0', color: '#ffffff30', fontSize: '12px' }}>
                            Choose your preffered payment option.
                        </div>
                        <div className="paymene-options-others">
                            Internet Banking
                        </div>
                        <div className="paymene-options-others">
                            UPI/Wallets
                        </div>
                        <div className="paymene-options-others">
                            Counter Visit Payment
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default Ticket