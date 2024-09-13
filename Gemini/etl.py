import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,Table, MetaData, insert,text
import pandas as pd
load_dotenv()

db = os.getenv("DATABASE")
user = os.getenv("USER")
pwd = os.getenv("PASSWORD")
port = os.getenv("PORT")
host=os.getenv("HOST")

def map_dtype(dtype):
    if dtype == 'int64':
        return 'INTEGER'
    elif dtype == 'float64':
        return 'FLOAT'
    elif dtype == 'object':
        return 'TEXT'
    elif dtype == 'datetime64[ns]':
        return 'TIMESTAMP'
    elif dtype == 'bool':
        return 'BOOLEAN'
    else:
        return 'TEXT'  # Default to TEXT for unknown types


def generate_create_table_sql(df, table_name):
    columns = []
    for column, dtype in df.dtypes.items():
        sql_type = map_dtype( str( dtype ) )
        columns.append( f'"{column}" {sql_type}' )

    columns_sql = ",".join( columns )
    # print(columns)
    create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_sql});"
    return create_table_sql

# df = pd.read_csv('orders.csv',na_values=['Not Available','unknown'])
# df.columns=df.columns.str.lower()
# df.columns=df.columns.str.replace(' ','_')

# engine = create_engine(f"postgresql+psycopg2://{user}:{pwd}@{host}:{port}/{db}")
# connection=engine.connect()
# query = generate_create_table_sql(df , "x123x")
# conn.execute(text(query))
# df.to_sql(table_name, con=conn , index=False, if_exists = 'append')
# print (f'{table_name} created succesfully ')