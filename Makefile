build:
   docker-compose up --build
   
restore:
    docker exec -i regions-district-mongo-db sh -c "mongorestore /var/dump"

down:
  docker-compose down 
  
