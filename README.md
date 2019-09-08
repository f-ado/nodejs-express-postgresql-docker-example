# NodeJS, Express, PostgreSQL dockerized

Example of dockerized express api alongside with postgresql db.

## Setup
In the root run `npm install`;

Run `docker-compose up` to start the services and `docker-compose down` to stop all services.

If you want to run the project without docker, you'll need an `.env` file with environment files values defined as in `.env.example`. After creating the database run `npm install` to fresh install all npm dependencies or `npm ci` to install all dependency versions from `package-lock.json`. To start the project run `npm start` in the root.

## Testing the endpoints

```
POST a new todo
curl -X POST -H "Content-Type:application/json" http://localhost:3000/todos -d '{"text":"New TODO"}'

GET all todos
curl http://localhost:3000/todos/

DELETE a todo
curl -X DELETE http://localhost:3000/todos/:id

GET todos by username
curl http://localhost:3000/users/tonystark/todos

GET all users
curl http://localhost:3000/users

GET "current" user (user found by username and set in context to current)
curl http://localhost:3000/users/current

GET user by id
curl http://localhost:3000/users/1
```