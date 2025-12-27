from prisma import Prisma
from datetime import datetime

async def handle_scrap_logic(payload: dict):
    """
    Sets equipment as unusable when a maintenance request is scrapped.
    """
    equipment_id = payload.get("equipmentId")
    request_id = payload.get("requestId")
    
    prisma = Prisma()
    await prisma.connect()
    
    try:
        async with prisma.tx() as transaction:
            # 1. Mark equipment as scrapped 
            await transaction.equipment.update(
                where={"id": equipment_id},
                data={
                    "isScrapped": True,
                    "scrappedDt": datetime.now()
                }
            )
            
            # 2. Log in the specialized scrap table
            await transaction.scrappped_eq.create(
                data={"equipmentId": equipment_id}
            )
            
            print(f"Worker: Equipment {equipment_id} successfully decommissioned.")
    finally:
        await prisma.disconnect()