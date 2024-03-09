import os
from dotenv import load_dotenv

from supabase import Client, create_client


# Load variables from .env file in the root directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
load_dotenv(dotenv_path)

# Access the variables
api_url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
api_key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")


def create_supabase_client():
    print(api_url)
    # supabase: Client = create_client(api_url, api_key)
    # return supabase