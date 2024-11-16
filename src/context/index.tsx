import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import contractABI from "../contractABI/index.json"
import { parseEther } from 'viem';


const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    const { primaryWallet } = useDynamicContext();
    const contractAddress = "0x837cBe8d21e3760477dc33813fE9552071e14FD7";
    const [address, setAddress] = useState<string|undefined>('');
    const [fanPoints, setFanPoints] = useState<number|null>(null)

    const [activePage, setActivePage] = useState("home");

    // const { mutateAsync: addTicketOwner, isLoading } = useContractWrite(contract, "addTicketOwner")

    const connect = useDynamicContext()
    useEffect(() => {
        if (connect) {
            setAddress(connect.primaryWallet?.address)
        }
    }, [connect])

    const [nftAsset, setNftAsset] = useState(
        {
            images: {}
        }
    );

    const [ticketNumber, setTicketNumber] = useState(0);

    useEffect(() => {
        const getNFTAssets = async () => {
            const data = await fetch("https://bafybeig7n2tc6gbkunybjfahwz4fsbso4roz7nw6fw45pqomjlkoxllb6a.ipfs.w3s.link/nftTicket.json");
            const response = await data.json();
            setNftAsset(response);
        }
        getNFTAssets();
    }, [])

  


    const addTicket = async (_amount: string, _fanPointsUsed: number, _typeOfTicket: string, _imgUrl: string) => {

        try {
            const val = parseEther(_amount);

            if (!primaryWallet) {
                console.error("Wallet not connected");
                throw new Error("Wallet not connected");
            }
    
            if (!isEthereumWallet(primaryWallet)) {
                throw new Error('bad');
            }

            const walletClient = await primaryWallet.getWalletClient()
            const tx = await walletClient.writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: 'addTicketOwner',
                args: [address, val, _fanPointsUsed, _typeOfTicket, _imgUrl],
                value: val
              });

            console.info("Contract call success:", tx);
            if (tx) {
                return tx
            } else {
                throw new Error('bad request')
            }
        }
        catch (err) {
            console.error("Contract call failure");
            return err;
        }
    }

    const getTickets = async () => {
        let allTickets = [];
        // try {
        //     const transactions = await contract.call('getAllTickets');
        //     allTickets = transactions.map((i: any) => {
        //         const timestamp = new Date(i.time.toNumber() * 1000).toLocaleString();
        //         return (
        //             {
        //                 owner: i.owner,
        //                 time: timestamp,
        //                 amount: utils.formatEther(i.amount),
        //                 type: i.typeOfTicket,
        //                 imgUrl: i.imgUrl
        //             }
        //         );
        //     });

        // } catch (err) {
        //     console.error(err);
        // }
        // return allTickets;
    }


    return (
        <StateContext.Provider value={
            {
                address,
                setAddress,
                contractAddress,
                nftAsset,
                setNftAsset,
                ticketNumber,
                setTicketNumber,
                addTicket,
                fanPoints,
                setFanPoints,
                activePage,
                setActivePage,
                getTickets
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);