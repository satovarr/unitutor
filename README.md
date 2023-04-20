# unitutor

## Development documentation

### Backend

1. cd ./api
2. create and activate virtual environment 

    (Windows)

    `pip install virtualenv`

    `python -m virtualvenv .env`

    `env/Scripts/activate`
  
    (Ubuntu) - to-do
  
    `sudo apt-get install libmysqlclient-dev`
  
    `pip3 install mysqlclient`

3. install requirements

    (.env)> `pip install -r requirements.txt`

4. add the firebase key to the path: /api/serviceAccountKey.json

6. uvicorn app.main:app --reload

### Frontend 

1. cd ./client

2. install node packages (requires previous NodeJS installation)
    
    `npm install`

3. add .env to /client

4. start development server

    `npm start` 

- missing requirements.txt


# Backend Deployment
The changes needed from dev to dep branches are:

1. move /api/. to /

2. create requirements.txt

    `pip install pip-chill`

    `pip-chill --no-versiom > requirements.txt`

3. create Procfile with running command inside
    
    `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. create .python-version file

    `3.11`
