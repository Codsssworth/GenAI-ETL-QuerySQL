SQL etl pipeline hooked to aiven postgreSQL , ORM transforms and creates tables based on user csv ,passes table schemas ,with natural language parameters to gemini_pro 1 model. \ ORM to execute gen ai queries and fetch table rows from postgre,
dsiplay output of fetched rows on react, node.js /express for auth routes

### configured to aiven cloud postgreDB to store user profile ,redis.io for message broker

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode .\
[http://localhost:3000]


Runs the server in the development mode.\
 [http://localhost:5000]

### \Gemini `python app.py`

Runs the server in the development mode.\
in [http://localhost:5001]
generates table schemas/handles etl /executes generated queries in db,fetches tables

### build and runs the container
docker-compose up --build


