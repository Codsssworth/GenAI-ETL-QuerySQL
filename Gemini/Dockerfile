FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
COPY ca.pem /app/ca.pem

EXPOSE 5001
ENV DATABASE_URL= database uri
ENV API_KEY= api key here
CMD ["python", "app.py"]