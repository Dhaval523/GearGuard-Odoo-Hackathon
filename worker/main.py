from fastapi import FastAPI
import uvicorn

app = FastAPI(title="GearGuard Worker Health API")

@app.get("/health")
async def health():
    return {"status": "healthy", "worker": "active", "scheduler": "active"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)