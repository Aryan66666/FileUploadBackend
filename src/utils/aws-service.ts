import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ResendConfirmationCodeCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ConfirmSignUpDto, UserSignUpDTO } from "../dtos/userSignDTO";
import { AppError } from "./error-handler";




export class AwsService {
    
    public async signUp(data:UserSignUpDTO){
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

        console.log("User signed Up with Data: ", data);
        if (data.password!==data.confirmPassword){
            throw new AppError("Passwords do not match", 400);
        }

        const email = data.email;
        const username = data.username;
        const password = data.password;
        const command = new SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: username,
            Password: password,
            UserAttributes: [{
                Name:"email",
                Value:email,
            },
        {
            Name: "name",
            Value: username,
        }]
        });
        return await client.send(command);  


    }
    public async confirmSignUp(data: ConfirmSignUpDto) {
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: 'aman',
            ConfirmationCode: data.code,
        });
        const result =  await client.send(command);
        return result;
    }
    public async resendConfirmationCode(username: string) {
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new ResendConfirmationCodeCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: username,
        });
        return await client.send(command);
    }
}