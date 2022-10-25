# unitutor

## API documentation

### set-up and running

1. cd ./api
2. create and activate virtual environment (Windows)
  > pip install virtualenv
  > python -m virtualvenv .venv
  > venv/Scripts/activate
3. install requirements
  (.venv)> pip install -r requirements.txt 
4. add .env to /app (depending on your connection)
5. add the firebase key to the path: /api/serviceAccountKey.json
6. uvicorn app.main:app --reload

## Front End documentation

### set-up and running
1. cd ./client
2. install node packages (requires previous NodeJS installation)
  > npm install
3. add .env to /client
4. start development server
  > npm start 


- missing requirements.txt

## Activate virtual environment
>> cd virtualenv/Scripts

>> activate

>> ../.. 

## Develompent run
>> uvicorn app:app --reload