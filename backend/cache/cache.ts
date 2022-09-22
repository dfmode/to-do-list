import Redis from "ioredis";

import { REDIS_URI } from "../config/config.js";

export const redisClient = new Redis(REDIS_URI);
