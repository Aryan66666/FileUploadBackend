#!/bin/bash
cd /home/ec2-user/backend
pm2 restart all || pm2 start dist/index.js --name backend
