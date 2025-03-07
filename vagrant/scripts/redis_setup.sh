#!/bin/bash

# Update and install Redis
sudo apt update
sudo apt install -y redis-server

# Configure Redis to listen on all interfaces
sudo sed -i "s/bind 127.0.0.1/bind 0.0.0.0/g" /etc/redis/redis.conf

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server
