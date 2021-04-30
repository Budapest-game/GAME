#!bin/bash

git fetch
git reset --hard origin/release
docker-compose up -d --build game
