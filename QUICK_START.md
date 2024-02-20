# Quick Start
## How to Start
```shell
# 1. git clone
git init
git clone https://rtl.acryl.ai/dawson/superset-test.git

# 2. copy .env file
cd ./docker
cp .env-back .env

# 3. run docker compose
docker-compose up

# 4. join to localhost:8088

# 5. login admin / admin
```

## Develop Case
### modify docker-compose.yml
```yml
(...)
# disable superset-websocket part
#  superset-websocket:
#    container_name: superset_websocket
#    build: ./superset-websocket
#    image: superset-websocket
#    ports:
#      - 8080:8080
#    extra_hosts:
#      - "host.docker.internal:host-gateway"
#    depends_on:
#      - redis
#    # Mount everything in superset-websocket into container and
#    # then exclude node_modules and dist with bogus volume mount.
#    # This is necessary because host and container need to have
#    # their own, separate versions of these files. .dockerignore
#    # does not seem to work when starting the service through
#    # docker compose.
#    #
#    # For example, node_modules may contain libs with native bindings.
#    # Those bindings need to be compiled for each OS and the container
#    # OS is not necessarily the same as host OS.
#    volumes:
#      - ./superset-websocket:/home/superset-websocket
#      - /home/superset-websocket/node_modules
#      - /home/superset-websocket/dist
#    environment:
#      - PORT=8080
#      - REDIS_HOST=redis
#      - REDIS_PORT=6379
#      - REDIS_SSL=false

(...)

# disable superset-node part
#  superset-node:
#    image: node:16
#    container_name: superset_node
#    command: ["/app/docker/docker-frontend.sh"]
#    env_file: docker/.env
#    depends_on: *superset-depends-on
#    volumes: *superset-volumes

(...)
```

### run frontend dev
```shell
cd ./superset-frontend
npm install
npm run dev
```