#!/bin/bash
logfile=$(date +%Y-%m-%d\(%H:%M:%S\)).log
screen -d -m -L -Logfile ./logs/$logfile ./screen_start.sh
