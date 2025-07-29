import { NextFunction, Request, Response } from "express";
import { AuthHandler } from "../utils/auth-handler";
import { ConfirmSignUpDto, SignInDto, UserSignUpDTO } from "../dtos/userSignDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { isNamedExportBindings } from "typescript";
import { sendResponse } from "../utils/response";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { AwsService } from "../utils/aws-service";

export class UserController {
    constructor(private readonly authHandler: AuthHandler){
        this.authHandler = authHandler;
    }
    public async signup(req: Request, res:Response, next: NextFunction) {
        const model: UserSignUpDTO  = plainToInstance(UserSignUpDTO, req.body as Object);
        const error = await validate(model);
        if(error.length>0){
        next(error);    
        }
        const result = await this.authHandler.signUp(model);
        return sendResponse(res, 201, "User signed up succesfully",result);



            
        }
    public async confirmSignUp(req: Request, res: Response, next: NextFunction) {
        const model: ConfirmSignUpDto = plainToInstance(ConfirmSignUpDto, req.body);
        const error = await validate(model);
        if( error.length){
            next(error);
        }
        const result = await this.authHandler.confirmSignUp(model);
        return sendResponse(res, 200, "User Confirmed successfully", result);

    }
    public async resendConfirmationCode(req: Request, res: Response, next: NextFunction) {
        const username = req.body.email;
        if (!username) {
            return sendResponse(res, 400, "Email is required");

        }
        const awsService = new AwsService();
        const result = await awsService.resendConfirmationCode(username);
        return sendResponse(res,200, "Code sent succesfully",result);


    }
    public async signIn(req:Request, res:Response, next:NextFunction){
        const model: SignInDto = plainToInstance(SignInDto, req.body);
        const error = await validate(model);
        if(error.length){
            next(error);
        }
        const result = await this.authHandler.signIn(model);
        if (result.AuthenticationResult) {
            return sendResponse(res, 200, "User signed in successfully", result);
        } else {
            return sendResponse(res, 400, "Sign in failed", null);
    }
    }

}