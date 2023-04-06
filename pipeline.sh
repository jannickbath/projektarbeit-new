#!/bin/bash

# FOR DRONE EXEC

# Drone environment variables
. /root/drone_env.sh

VOLUME=/prod/$DRONE_REPO_NAME
CONTAINERID=$(docker ps -aqf "name=^/${DRONE_REPO_NAME}$")
CREATED=0

if [ ! $CONTAINERID ]; then
    mkdir -p $VOLUME

    VOLUME=$VOLUME DRONE_REPO_NAME=$DRONE_REPO_NAME docker-compose build
    VOLUME=$VOLUME DRONE_REPO_NAME=$DRONE_REPO_NAME docker-compose up -d

    CONTAINERID=$(docker ps -aqf "name=^/${DRONE_REPO_NAME}$")
    CREATED=1

fi

trash $VOLUME/*
cp -r * $VOLUME/


if [ $CREATED == 1 ]; then
    cd $VOLUME
    rm -rf node_modules package-lock.json
    npm i
fi

docker restart $CONTAINERID