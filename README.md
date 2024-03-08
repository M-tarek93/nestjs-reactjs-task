
# NestJS/ReactJS App

This monorepo contains a very simple implementation of a full-stack application that includes a ReactJS front-end and NestJS backend with MongoDB as a database.

## Back-End
Was built using NestJS + MongoDB.

Features:
- `User` and `Auth` modules in addition to health check module.
- Logging for requests/errors
- Rate-limiting
- JWT authentication
- Swagger documentation
- Helmet

## Front-End
Was built using ReactJS + [Material-UI](https://mui.com/material-ui).

Pages:
- Register
- Login
- Profile

Libraries used: [react-toastify](https://www.npmjs.com/package/react-toastify), [react-hook-form](https://react-hook-form.com), [react-query](https://tanstack.com/query/latest), [bootstrap](https://getbootstrap.com)

## Usage:
1- Clone the repo
```sh
git clone https://github.com/M-tarek93/nestjs-reactjs-task.git
```
2- Navigate to the front-end or backend directories.
```sh
cd app
```
or
```sh
cd client
```
3- Install dependencies
```sh
npm Install
```
4- Run the project
```sh
npm start
```
** For the back-end, you can use the docker-compose file
### Env variables
#### For back-end:
- `MONGODB_URI` MongoDB connection string
- `APP_BASE_URL` Back-end URL
- `JWT_SECRET` Secret used to sign JWT tokens
- `JWT_EXPIRY` TTL for JWT token in Zeit format
#### For front-end
- `BACKEND_BASE_URL` Base URL for NestJS backend

## Live Demo
[React client](https://nest-react-7rdez4see-m-tarek93.vercel.app)

[Swagger](https://nest.fly.dev/swagger)

** might take a bit to load at first (cold start)