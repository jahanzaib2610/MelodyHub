#!/bin/bash

echo "Setting up MelodyHub database..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "Pushing schema to database..."
npx prisma db push

echo "Database setup complete!"
echo "You can now run 'npm run dev' to start the application."
