#!/bin/bash
sudo apt update -y
sudo apt install -y nodejs npm
npm install cli-progress
node animation.js ; cat errorlog.txt
