#!/bin/bash
docker stop superset_node
docker rm superset_node

node_id=$(sudo docker images | grep node | awk '{print $3}')
echo 'node_id' $node_id

docker rmi $node_id

docker compose up -d

docker ps -a
