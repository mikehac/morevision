#!/bin/bash

# Define the folder variable
FOLDER_PATH="./volumes_postgres"

# Check if the folder exists
if [ ! -d "$FOLDER_PATH" ]; then
    echo "Creating folder: $FOLDER_PATH"
    mkdir -p "$FOLDER_PATH"
    chmod 755 "$FOLDER_PATH"
else
    echo "Folder already exists: $FOLDER_PATH"
fi

# Run docker-compose up
docker-compose up -d
