from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import convert_text_to_sql
from etl import generate_create_table_sql
from sqlalchemy import create_engine, text
from adv_prompt import Advance_text_to_sql
from dotenv import load_dotenv
import pandas as pd
import os
import asyncio
import psycopg2  # Import your conversion logic

app = Flask(__name__)
CORS(app)  # Enable CORS

load_dotenv()
db = os.getenv("DATABASE")
user = os.getenv("USER")
pwd = os.getenv("PWD")
port = os.getenv("PORT")
host = os.getenv("HOST")
# DATABASE_URL = os.getenv("DATABASE_URL")


ca_cert_path = './ca.pem'
with open(ca_cert_path, 'r') as file:
    ca_cert = file.read()

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "sslrootcert": ca_cert_path
    }
)

# engine = create_engine(f"postgresql+psycopg2://{user}:{pwd}@{host}:{port}/{db}")

@app.route('/convert', methods=['POST'])
def convert():
    try:
        data = request.json
        # print(data)
        if not data or 'text' not in data:
            raise ValueError("Invalid input: 'text' field is required.")
        
        prompt = data['text'].strip()
        if not prompt:
            raise ValueError("Input text cannot be empty.")
        
           # Check if the request contains 'is_logged_in' flag to decide advanced query logic
        is_logged_in = data.get('is_logged_in', False)
        table_name = data.get('table_name', 'default_table')
        column_names = data.get('column_names')
        

        
        if is_logged_in:
            
            # print(table_name)
            # print(prompt)
            sql_query = asyncio.run(Advance_text_to_sql(prompt, table_name, column_names))
            print("query : ",sql_query)
            # sql_query = 'SELECT * FROM ravana;'
            connection=engine.connect()
            print(connection)
            df = pd.read_sql_query(sql_query, connection)
            # print(df)
            connection.close()
            result_data = df.to_dict(orient='records')
            # print("dict :",result_data)
            return jsonify({"sql_query": sql_query, "result": result_data}), 200

        else:
            # Regular prompting for non-logged-in users
            sql_query = asyncio.run(convert_text_to_sql(prompt))
            print("reg query:",sql_query)
            return jsonify({"sql_query": sql_query, "result": None}), 200
            # result = {"sql_query": sql_query, "result": None}

        # print("RESULT",result['sql_query'])
        # print("MAIN",result['result'].to_dict(orient='records'))
        # return jsonify({"sql_query": result['sql_query'], "result": result['result'].to_dict(orient='records')}), 200
        

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred.', 'details': str(e)}), 500
    


@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    try:
        # Ensure a file is provided
        if 'file' not in request.files:
            raise ValueError("No file part")
        file = request.files['file']
        if file.filename == '':
            raise ValueError("No selected file")

        # Read the CSV into a DataFrame
        df = pd.read_csv(file)
        df.columns = df.columns.str.lower().str.replace(' ', '_')

        table_name = request.form.get('table_name')
        # print(table_name)
        if not table_name:
            raise ValueError("Table name is required")

        # Create table and insert data
        with engine.connect() as conn:
            # print(conn)
            query = generate_create_table_sql(df, table_name)
            # print(query)
            conn.execute(text(query))
            df.to_sql(table_name, con=conn, index=False, if_exists='append')
            conn.commit()
            conn.close()
        
        # Prepare column names for response
        # print(column_names)
        column_names = df.columns.tolist()
        # print(column_names)
        print(jsonify({"message": f"Table {table_name} created and data inserted successfully", "columns": column_names}))
        return jsonify({"message": f"Table {table_name} created and data inserted successfully", "columns": column_names}), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred.', 'details': str(e)}), 500
    




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
