from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from . import deck
from . import database

from datetime import date

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
sb = database.create_supabase_client()

# THIS DIDN'T WORK SO I'M JUST HARD CODING THE SOURCE.
# Allow CORS for the frontend during development (localhost:3000)
# and for the same domain in production
# if not app.debug:
#     origins = ["https://example.com"]  # Replace with your production domain
# else:
#     origins = ["http://localhost:3000"]  # Development frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3000",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/api/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}


# @app.get("/api/user")
# def healthchecker():
#     user = sb.auth.get_user()
#     return user

# @app.post("/api/draw")
# async def draw_card():
#     reading = deck.draw()

#     data = sb.table("readings").insert({
#         "user_id":1,
#         "first_card_name": reading[0].Card,
#         "second_card_name": reading[1].Card,
#         "third_card_name": reading[2].Card,
#         "first_card_desc": reading[0].Meaning,
#         "second_card_desc": reading[1].Meaning,
#         "third_card_desc": reading[2].Meaning,
#         }).execute()

#     return data

class Birth(BaseModel):
    user_id: str
    birth_date: date

@app.post("/api/draw/{user_id}")
async def draw_card(user_id):
    reading = deck.draw()

    data = sb.table("readings").insert({
        "user_id":user_id,
        "first_card_name": reading[0].Card,
        "second_card_name": reading[1].Card,
        "third_card_name": reading[2].Card,
        "first_card_desc": reading[0].Meaning,
        "second_card_desc": reading[1].Meaning,
        "third_card_desc": reading[2].Meaning,
        }).execute()

    return data

# adding birth day for birth chart info
@app.post("/api/birth/")
async def save_birthday(birth: Birth):

    birth = sb.table("birth").insert({
        "user_id":birth.user_id,
        "birth_date":birth.birth_date.isoformat()
    }).execute()

    return birth