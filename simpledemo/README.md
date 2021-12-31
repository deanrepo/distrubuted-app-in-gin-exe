# simple demo 
web - api

# caution
remeber to change the url in the .env file to real ip addr when deployed, otherwise a cors preflight error will be thorwn

# build dependency images
  1) build api image
    $ cd ./api/
    $ docker build -t api .
  2) build web image
    $ cd ./web/
    $ docker build -t web .

# start
  $ docker-compose up -d

# stop
  $ docker-compose down

# check logs
  $ docker-compose logs
