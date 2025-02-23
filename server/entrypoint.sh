#!/bin/sh

# Check if migrations have already been run
if [ ! -f /app/migrations_ran ]; then
  # Run migrations
  npm run migration:generate
  npm run migration:run

  # Create a flag file to indicate that migrations have been run
  touch /app/migrations_ran
fi

# Start the application
npm run start:prod