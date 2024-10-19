#!/bin/bash
sudo apt update -y
sudo apt install -y nodejs npm
npm install cli-progress
node run-tavern-install.js ; cat errorlog.txt
