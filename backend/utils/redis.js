import { createClient } from "redis";
const redisClient = createClient();
await redisClient.connect();

async function getOrSetCache(key, callback) {
    try {
        const data = await redisClient.get(key);
        if (data !== null) {
            // console.log("CACHE HIT");
            return JSON.parse(data);
        }
        // console.log("CACHE MISS");
        const FAQs = await callback();
        await redisClient.set(key, JSON.stringify(FAQs));
        return FAQs;
    } catch (error) {
        throw error;
    }
}

async function clearCache() {
    // console.log("Flush")
    await redisClient.flushAll()
}

export default {clearCache, getOrSetCache}
