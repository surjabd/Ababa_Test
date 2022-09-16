# Ababa_Test Instruction

## Database Instuction

It us assumed user has postgreSQL DB installed, running and knows how to create new DB using either GUI or CLi

Create a PostgreSQL DB


## FrontEnd Instruction

Open `my-app` folder 

###Install packages
```
npm install
```

###Start Dev server
```
npm start
```


## Backend Instruction

Open `nest-typeorm-postfres` folder

###Install packages
```
npm install
```

###Set up .env file
Open/Creare the following file (Please note .env is not recommened to be pushed to GIT)

```
...../nest-typeorm-postfres/src/common/envs/development.env
```
Please provide the DB connection value you set when create DB and DB user
```
PORT=3000
BASE_URL=http://localhost:3000

DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=
```

###Start Dev server
```
npm start
```

## How to Use

In a browser open 
`http://localhost:3005/`

User the following credentials to login

```
username: elon@gmail.com
password: test
```

Add new movie to database using the `Add New Movie` Button

Try search, sorting , pagination

