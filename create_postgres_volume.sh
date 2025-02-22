#!/bin/bash

# Load environment variables from .env file
set -a # Automatically export all variables
source "$(dirname "$0")/.env"
set +a

# Check if POSTGRES_VOLUME_PATH is set
if [ -z "$POSTGRES_VOLUME_PATH" ]; then
    echo "Error: POSTGRES_VOLUME_PATH is not set in the .env file."
    exit 1
fi

# Create the volume directory if it doesn't exist
if [ ! -d "$POSTGRES_VOLUME_PATH" ]; then
    echo "Creating PostgreSQL volume directory at: $POSTGRES_VOLUME_PATH"
    sudo mkdir -p "$POSTGRES_VOLUME_PATH"
    sudo chmod 755 "$POSTGRES_VOLUME_PATH"
else
    echo "PostgreSQL volume directory already exists at: $POSTGRES_VOLUME_PATH"
fi
