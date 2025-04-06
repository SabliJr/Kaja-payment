#!/bin/bash

# Store the root directory
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Kill any existing processes on the required ports
kill $(lsof -t -i:3000) 2>/dev/null || true
kill $(lsof -t -i:3001) 2>/dev/null || true
kill $(lsof -t -i:3002) 2>/dev/null || true

echo "Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd "$ROOT_DIR/backend" && pnpm install

# Install frontend ecom dependencies
echo "Installing frontend ecom dependencies..."
cd "$ROOT_DIR/frontend/ecom" && pnpm install

# Install frontend dashboard dependencies
echo "Installing frontend dashboard dependencies..."
cd "$ROOT_DIR/frontend/dashboard" && pnpm install

echo "Starting all services..."

# Start JSON Server
echo "Starting JSON Server on port 3001..."
cd "$ROOT_DIR/db" && pnpx json-server --watch products.json --port 3001 &

# Start Backend
echo "Starting Backend..."
cd "$ROOT_DIR/backend" && pnpm run dev &

# Start Frontend E-commerce
echo "Starting E-commerce Frontend on port 3000..."
cd "$ROOT_DIR/frontend/ecom" && pnpm run start --port 3000 &

# Start Dashboard
echo "Starting Dashboard on port 3002..."
cd "$ROOT_DIR/frontend/dashboard" && pnpm exec vite --port 3002 &

# Keep the script running and show logs
wait

echo "All services have been started!" 