import asyncio
import json
from redis_config import get_redis
from tasks.scrap_tasks import handle_scrap_logic
from tasks.email_tasks import send_maintenance_email

async def start_worker():
    redis_client = await get_redis()
    print("GearGuard Worker: Listening for tasks on Redis Cloud...")

    while True:
        try:
            # BRPOP waits for a message in the 'maintenance_queue'
            result = await redis_client.brpop("maintenance_queue", timeout=0)
            
            if result:
                _, raw_message = result
                data = json.loads(raw_message)
                
                task_type = data.get("type")
                payload = data.get("payload")

                # ROUTING LOGIC
                if task_type == "SCRAP_EQUIPMENT":
                    # Updates 'isScrapped' and logs to 'scrappped_eq'
                    await handle_scrap_logic(payload)
                
                elif task_type == "MAINTENANCE_CREATED":
                    # Sends email to the technician
                    await send_maintenance_email(payload)
                
                else:
                    print(f"Worker: Unknown task type {task_type}")

        except Exception as e:
            print(f"Worker Loop Error: {e}")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(start_worker())