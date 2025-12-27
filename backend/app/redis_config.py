import redis.asyncio as redis
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_CLOUD_URL")

async def get_redis():
    """Returns a Redis client connected to Redis Cloud."""
    if not REDIS_URL:
        raise ValueError("REDIS_CLOUD_URL is missing in .env")
    
    # decode_responses=True converts bytes to strings automatically
    return redis.from_url(REDIS_URL, decode_responses=True)