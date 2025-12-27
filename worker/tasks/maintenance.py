from prisma import Prisma
from datetime import datetime, timedelta

async def run_preventive_scheduler():
    """
    Cron Job: Checks policy and creates Preventive requests if none exist[cite: 47].
    """
    prisma = Prisma()
    await prisma.connect()
    
    try:
        # Find all equipment not scrapped 
        active_equipment = await prisma.equipment.find_many(
            where={"isScrapped": False}
        )

        for eq in active_equipment:
            # Check for existing open Preventive requests [cite: 29]
            existing = await prisma.maintenance_requests.find_first(
                where={
                    "equipmentId": eq.id,
                    "maintenanceType": "PREVENTIVE",
                    "stage": {"not": "REPAIRED"}
                }
            )

            if not existing:
                # Auto-fill: Fetch category and team from equipment record 
                await prisma.maintenance_requests.create(
                    data={
                        "createdById": 1, # System User
                        "equipmentId": eq.id,
                        "categoryId": eq.categoryId,
                        "maintenanceType": "PREVENTIVE",
                        "companyId": eq.companyId,
                        "teamId": eq.maintenanceTeamId,
                        "scheduledDt": datetime.now() + timedelta(days=7),
                        "stage": "NEW"
                    }
                )
                print(f"Scheduled: New Preventive checkup for {eq.name}")
    finally:
        await prisma.disconnect()