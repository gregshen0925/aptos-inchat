import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL_PUBLIC!)

export default redis