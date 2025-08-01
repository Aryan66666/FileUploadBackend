
PORT = 3000
MONGOURL = mongodb+srv://ZerodhaDB:ZerodhaDB@backendmilestone.r31aujm.mongodb.net/?retryWrites=true&w=majority&appName=BackendMilestone
COGNITO_CLIENT_ID = 4lgt18btmo1e2378j9kvpg10u8
COGNITO_REGION = eu-west-1
AWS_BUCKET_NAME =filesharingprojectbucket
AWS_ACCESS_KEY_ID = AKIAQYEI5IF34NI7D37P
AWS_SECRET_ACCESS_KEY = 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
AWS_REGION = eu-west-1
#!/bin/bash
cd /home/ec2-user/backend
pm2 restart all || pm2 start dist/index.js --name backend
