import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: '3466c161-f1bc-404f-ab4a-3eef2366141d',
      walletConnectors: [ EthereumWalletConnectors ],
    }}>
    <DynamicWidget />
  </DynamicContextProvider>
);

export default App;
