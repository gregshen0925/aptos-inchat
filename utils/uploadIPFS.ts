import { create } from 'ipfs-http-client';

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID

const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET

export const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    },
});

export const uploadIpfs = async <T>(data: T) => {
    const result = await client.add(JSON.stringify(data));
    return result;
};

export const uploadAssetToIpfs = async (file: File) => {
    const result = await client.add(file);
    return result
}