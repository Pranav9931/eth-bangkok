import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from './context';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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

root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <DynamicContextProvider
            settings={{
            walletConnectors: [EthereumWalletConnectors],
            environmentId: '3466c161-f1bc-404f-ab4a-3eef2366141d',
            overrides:  { evmNetworks } ,
        }}>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </DynamicContextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);