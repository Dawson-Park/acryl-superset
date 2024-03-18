#!/bin/bash
docker stop superset_app superset_worker superset_worker_beat superset_node superset_init superset_nginx
docker rm superset_app superset_worker superset_worker_beat superset_node superset_init superset_nginx
superset_id=sudo docker images | grep apachesuperset | awk '{print $3}'
node_id=sudo docker images | grep node | awk '{print $3}'
docker rmi $superset_id $node_id