# unitutor

## API documentation

### set-up and running

1. cd ./api
2. create and activate virtual environment (Windows)
  > python -m venv venv
  > cd venv/Scripts
  > activate
  > cd ../..
3. download requirements
4. add .env on /app/sql_app
5. add the firebase key to the path: /api/serviceAccountKey.json
6. uvicorn app.main:app --reload
