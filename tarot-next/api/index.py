from fastapi import FastAPI

from . import deck
from . import database

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
sb = database.create_supabase_client()

@app.get("/api/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}

@app.get('/draw')
async def draw_card():
    reading = deck.draw()

    data = sb.table("readings").insert({
        "user_id":1,
        "first_card_name": reading[0].Card,
        "second_card_name": reading[1].Card,
        "third_card_name": reading[2].Card,
        "first_card_desc": reading[0].Meaning,
        "second_card_desc": reading[1].Meaning,
        "third_card_desc": reading[2].Meaning,
        }).execute()

    return data