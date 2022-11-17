import { AptosClient, TokenClient, Types } from 'aptos';

export const client = new AptosClient(
    "https://fullnode.testnet.aptoslabs.com"
);

export const tokenClient = new TokenClient(client);

export { Types };

export const MODULE_ADDRESS = "0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9";

export const USER_TABLE_HANDLE = "0x2ff381fa3c00c286d83e16b74e21833649b473a2ed53a1a85a8d53483b133ded";