import google.generativeai as genai
import os
from dotenv import load_dotenv


load_dotenv()

GOOGLE_API_KEY = os.getenv('API_KEY')
# Initialize the Google Generative AI client with your API key
genai.configure(api_key=GOOGLE_API_KEY)
model= genai.GenerativeModel("gemini-1.0-pro")

async def convert_text_to_sql(prompt: str) -> str:
    """
    Converts natural language text to SQL query using Google's Generative AI API.

    """

    try:
        # Generate the SQL query using Google Generative AI
        print(prompt)
        prompt=f"Convert the following text to an SQL query:{prompt} , Don't include ``` in beginning and end. but include ; at the end. if table name is not specified give one for example"  
        response = model.generate_content(contents=prompt)      
        sql_query = response.text
        print(sql_query)

        return sql_query
    except Exception as e:
        # Log the error or handle accordingly
        raise e

# async def simple_test():
#     try:
#         response = genai.generate_text(
#             prompt="Test prompt",
#             model="models/text-bison-001",  # Adjust as needed
#             max_output_tokens=50,
#         )
#         print("Test Response:", response)
#     except Exception as e:
#         print("Error during test API call:", e)

# Call the test function to check if the API works in general

# models = genai.list_models()
# modelss = genai.GenerativeModel("gemini-pro")
# for model in models:
#     print(model.name)

# asyncio.run(simple_test())