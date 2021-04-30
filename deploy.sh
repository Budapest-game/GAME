#!bin/bash

cd /game
git fetch
git reset --hard origin/release
docker-compose up -d --build game
