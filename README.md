# unitutor

## API documentation

### set-up and running

1. cd ./api
2. create and activate virtual environment (Windows)
  > pip install virtualenv
  > python -m virtualvenv .venv
  > venv/Scripts/activate
3. install requirements
4. add .env to /app
5. add the firebase key to the path: /api/serviceAccountKey.json
6. uvicorn app.main:app --reload
