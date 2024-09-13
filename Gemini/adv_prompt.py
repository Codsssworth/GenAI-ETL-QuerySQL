import os
from dotenv import load_dotenv
import pandas as pd
import google.generativeai as genai
from sqlalchemy import create_engine,Table, MetaData, insert,text

load_dotenv()
db = os.getenv("DATABASE")
user = os.getenv("USER")
pwd = os.getenv("PWD")
port = os.getenv("PORT")
host = os.getenv("HOST")
GOOGLE_API_KEY = os.getenv('API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
# engine = create_engine(f"postgresql+psycopg2://{user}:{pwd}@{host}:{port}/{db}")

async def Advance_text_to_sql(prompt: str, table_name: str, column_names: str) -> str:
    """
    Converts natural language text to SQL query using Google's Generative AI API.

    """
    model= genai.GenerativeModel("gemini-1.0-pro")
    # model= genai.GenerativeModel("text-bison-001")

    # for m in genai.list_models():
    #     print(m)
    # print("im inside the base ")

    try:
        # table_name = "borders"
        # Update the prompt with table name and column names
        detailed_prompt = (
            f"You are an expert SQL query writer. Given a question about a student database table with the following columns: "
            f"{column_names}, generate an appropriate SQL query that will retrieve the relevant information."
            f"table name is {table_name} ."
            f"\n\nQuestion: {prompt}"
            f"Don't include ``` in beginning and end. but include ; at the end"
        )
        
            # Generate the SQL query using Google Generative AI
            # response = genai.generate_text(
            #     prompt=detailed_prompt,
            #     model="models/text-bison-001",
            #     max_output_tokens=150,
            #     temperature=0,

        response = model.generate_content(
            contents=detailed_prompt,
        )
        
        sql_query = response.text
        # print(sql_query)

        return sql_query
        # sql_query = parts[0].get('text', '').strip()
        # sql_query = response.result.strip()  # Adjust based on response structure
        # return (sql_query)

    except Exception as e:
        print(e)
        # Log the error or handle accordingly
        raise e