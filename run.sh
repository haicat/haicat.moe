#!/bin/bash
logfile=$(date +%Y-%m-%d\(%H:%M:%S\)).log
screen -d -m -L -Logfile ./$logfile ./screen_start.sh
