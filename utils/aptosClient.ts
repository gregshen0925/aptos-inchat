import { AptosClient, TokenClient, Types } from 'aptos';

export const client = new AptosClient(
    "https://fullnode.testnet.aptoslabs.com"
);

export const tokenClient = new TokenClient(client);

export { Types };

export const MODULE_ADDRESS = "0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9";

export const MODULE_ID = `${MODULE_ADDRESS}::inchat_v1`

export const CREATOR_ADDRESS = "0xa9eb381c1bad4a7b6909dbdf3a52b99b62148a0c657019292d98191e03b91631";

export const COLLECTION_NAME = "AptosInChatV1: Greg0925";

export const GROUP_NAME = "Greg's Room";

export const USER_TABLE_HANDLE = "0x2ff381fa3c00c286d83e16b74e21833649b473a2ed53a1a85a8d53483b133ded";