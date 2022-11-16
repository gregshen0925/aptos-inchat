import { AptosClient, TokenClient, Types } from 'aptos';

export const client = new AptosClient(
    "https://fullnode.testnet.aptoslabs.com"
);

export const tokenClient = new TokenClient(client);

export { Types };

export const MODULE_ADDRESS = "0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9";