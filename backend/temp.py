import asyncio
from prisma import Prisma

async def main():
    db = Prisma()
    await db.connect()
    
    # Delete all test data
    await db.maintenancerequest.delete_many()
    await db.equipment.delete_many()
    await db.equipmentcategory.delete_many()
    await db.team.delete_many()
    await db.user.delete_many()
    await db.department.delete_many()
    await db.workcenter.delete_many()
    await db.company.delete_many()
    
    print("✅ All test data deleted")
    await db.disconnect()

asyncio.run(main())
