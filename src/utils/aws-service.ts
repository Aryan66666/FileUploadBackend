import { CognitoIdentityProviderClient, ConfirmSignUpCommand, GetSigningCertificateCommandOutput, InitiateAuthCommand, InitiateAuthCommandOutput, ResendConfirmationCodeCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ConfirmSignUpDto, SignInDto, UserSignUpDTO } from "../dtos/userSignDTO";
import { AppError } from "./error-handler";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";




export class AwsService {

    public async signUp(data: UserSignUpDTO) {
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

        console.log("User signed Up with Data: ", data);
        if (data.password !== data.confirmPassword) {
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
    public async confirmSignUp(data: ConfirmSignUpDto) {
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: data.username,
            ConfirmationCode: data.code,
        });
        const result = await client.send(command);
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
    public async signIn(dto: SignInDto): Promise<InitiateAuthCommandOutput> {
        const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });
        const command = new InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: dto.username,
                PASSWORD: dto.password
            },
            AuthFlow: "USER_PASSWORD_AUTH"


        })
        const result = await client.send(command);
        if (!result.AuthenticationResult) {
            throw new AppError("Authentication failed", 401)
        }
        return result;

    }
    public async uploadileToS3(file: Express.Multer.File, key: string) {
        const s3 = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }

        })
        const bucketName = process.env.AWS_BUCKET_NAME!;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        try {
            const putCommand = new PutObjectCommand(params);
            const result = await s3.send(putCommand);
            return result;
        }
        catch (err) {
            console.log(err);
            throw new AppError((err as Error).message, 500);
        }



    }
}