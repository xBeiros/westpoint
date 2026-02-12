#!/bin/bash

set -e

echo "=== DEPLOY START ==="

BRANCH="main"

echo "Fetching latest code..."
git fetch origin

echo "Resetting to origin/$BRANCH ..."
git reset --hard origin/$BRANCH
git clean -fd

echo "Installing PHP dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

echo "Installing Node dependencies..."
npm ci

echo "Building frontend..."
npm run build

echo "Running migrations..."
php artisan migrate --force

echo "Clearing and caching..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Restarting queue..."
php artisan queue:restart || true

echo "=== DEPLOY DONE ==="
