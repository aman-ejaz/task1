# Deployment steps for Project backend application to AWS ApiGateway and Lambda using Serverless framework

## Instructions

1. Create an Amazon Aurora PostgreSQL-Compatible database after following link https://us-east-2.console.aws.amazon.com/rds/home. Choose Engine version 9.6.9

2. Note Database Host, Username, Password and Database name.

3. Clone repository from location [] `some valid repo address`

4. Connect above created database using PG Admin(https://www.pgadmin.org/download/) and run sql scripts available in NotificationsPlus repository folder backend/sqlScripts in following order:-

   1. user.sql

5. Install serverless framework globally `npm install -g serverless`.

6. Install AWS CLI (on Ubuntu 18.04) `sudo apt install awscli`.

7. Setup AWS credentials using serverless `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

8. Deploy microservices in order as provided below. Some microservice have dependency on others. For deploying each individual microservice, follow their README.md file instructions.
   1. apigateway
   2. user
