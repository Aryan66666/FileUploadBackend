#!/bin/bash

# Fetch secrets JSON from AWS Secrets Manager
SECRET_JSON=$(aws secretsmanager get-secret-value \
  --secret-id BackendSecrets \
  --region eu-west-1 \
  --query SecretString \
  --output text)

# Parse JSON and export each key-value as env var (requires jq)
export $(echo $SECRET_JSON | jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]')

# Go to backend directory
cd /home/ec2-user/backend

# Start or restart your app with updated env
pm2 restart all --update-env || pm2 start dist/index.js --name backend
