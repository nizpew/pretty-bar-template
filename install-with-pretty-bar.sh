#!/bin/bash



#!/bin/bash

# Define the marker file path
marker_file="~/marker_file.txt"

# Check if the marker file exists
if [ -f "$marker_file" ]; then
    # This block runs only the first time
sudo apt update -y
sudo apt install -y nodejs npm
npm install cli-progress
node animation.js ; cat errorlog.txt

    # Your first-time code goes here
    # For example, creating the marker file
    touch "$marker_file"
else
    # This block runs on subsequent runs
node animation.js ; cat errorlog.txt
fi






