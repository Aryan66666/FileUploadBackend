"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const error_handler_1 = require("./error-handler");
const client_s3_1 = require("@aws-sdk/client-s3");
class AwsService {
    async signUp(data) {
        const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        console.log("User signed Up with Data: ", data);
        if (data.password !== data.confirmPassword) {
            throw new error_handler_1.AppError("Passwords do not match", 400);
        }
        const email = data.email;
        const username = data.username;
        const password = data.password;
        const command = new client_cognito_identity_provider_1.SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: username,
            Password: password,
            UserAttributes: [{
                    Name: "email",
                    Value: email,
                },
                {
                    Name: "name",
                    Value: username,
                }]
        });
        return await client.send(command);
    }
    async confirmSignUp(data) {
        const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: data.username,
            ConfirmationCode: data.code,
        });
        const result = await client.send(command);
        return result;
    }
    async resendConfirmationCode(username) {
        const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new client_cognito_identity_provider_1.ResendConfirmationCodeCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: username,
        });
        return await client.send(command);
    }
    async signIn(dto) {
        const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: dto.username,
                PASSWORD: dto.password
            },
            AuthFlow: "USER_PASSWORD_AUTH"
        });
        const result = await client.send(command);
        if (!result.AuthenticationResult) {
            throw new error_handler_1.AppError("Authentication failed", 401);
        }
        return result;
    }
    async uploadileToS3(file, key) {
        const s3 = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });
        const bucketName = process.env.AWS_BUCKET_NAME;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        try {
            const putCommand = new client_s3_1.PutObjectCommand(params);
            const result = await s3.send(putCommand);
            return result;
        }
        catch (err) {
            console.log(err);
            throw new error_handler_1.AppError(err.message, 500);
        }
    }
}
exports.AwsService = AwsService;
