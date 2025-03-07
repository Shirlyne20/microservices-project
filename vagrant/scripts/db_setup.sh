#!/bin/bash

# Update and install PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE microservices;"
sudo -u postgres psql -c "CREATE USER admin WITH PASSWORD 'admin123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE microservices TO admin;"

# Allow remote connections
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/*/main/postgresql.conf
sudo sed -i "s/host    all             all             127.0.0.1\/32            md5/host    all             all             0.0.0.0\/0               md5/g" /etc/postgresql/*/main/pg_hba.conf

# Restart PostgreSQL
sudo systemctl restart postgresql