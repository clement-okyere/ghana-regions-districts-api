#Description

- A node js backend web api project that has the regions and ditricts in ghana with their capitals.
- Endpoints are going to be added for communities in the future

#Requirements
-Docker
-Docker compose

#Project Setup

- Set environment variables for ENV_PORT,MONGODB_HOST, MONGODB_DATABASE in env file
- Run "make build" to start application
- you can access the application on port 3005. (exposed port can be modified in docker-compose.yml)
- Run "make down" to stop application
