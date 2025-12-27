import asyncio
from apscheduler.schedulers.asyncio import AsyncioScheduler
from tasks.maintenance import run_preventive_scheduler

async def main():
    scheduler = AsyncioScheduler()
    
    # Run at midnight every night [cite: 47, 49]
    scheduler.add_job(run_preventive_scheduler, 'cron', hour=0, minute=0)
    
    scheduler.start()
    print("GearGuard Scheduler: Nightly Preventive jobs are active.")
    
    try:
        while True:
            await asyncio.sleep(1000)
    except (KeyboardInterrupt, SystemExit):
        pass

if __name__ == "__main__":
    asyncio.run(main())