#!/bin/bash

# Update and install Node.js
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Clone and set up the frontend
cd /home/vagrant
git clone https://github.com/your-username/microservices-project.git
cd microservices-project/backend
npm install

# Start the frontend
npm start &
