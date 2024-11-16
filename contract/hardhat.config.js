const { CHILIZ_RPC_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "CHILIZ",
    networks: {
      hardhat: {},
      fantom: {
        url: CHILIZ_RPC_URL,
        chainId: 88882,
        gasPrice: 1000000000,
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};