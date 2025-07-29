import { ConfirmSignUpCommandOutput, InitiateAuthCommand, InitiateAuthCommandOutput, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { ConfirmSignUpDto, SignInDto, UserSignUpDTO } from "../dtos/userSignDTO";
import { AwsService } from "./aws-service";
import { AppError } from "./error-handler";

export class AuthHandler {
    constructor(private readonly awsService: AwsService){
        this.awsService = awsService;
    }
    public async signUp(data: UserSignUpDTO): Promise<SignUpCommandOutput>{
        if (data.password !== data.confirmPassword){
            throw new AppError("Passwords do not match",400);
        }
        const user = await this.awsService.signUp(data);
        return user;
    }
    public async confirmSignUp(data: ConfirmSignUpDto): Promise<ConfirmSignUpCommandOutput>{
        const result = await this.awsService.confirmSignUp(data);
        if (!result) {
            throw new AppError("Confirmation Failed", 400);
        }
        return result; 
    }
    public async signIn(dto: SignInDto): Promise<InitiateAuthCommandOutput>{
        const user = await this.awsService.signIn(dto);
        if(!user){
            throw new AppError("Sign In Failed", 400);
        }
        return user;
    }
    
}