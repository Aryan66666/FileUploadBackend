import { NextFunction, Request, Response } from "express";
import { AuthService } from "../utils/auth-service";
import { ConfirmSignUpDto, SignInDto, UserSignUpDTO } from "../dtos/userSignDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { sendResponse } from "../utils/response";
import { AwsService } from "../utils/aws-service";
import { UserRepository } from "../repositories/user-repository";

export class UserController {
    constructor(private readonly authHandler: AuthService,
        private readonly repository: UserRepository
    ){
        this.authHandler = authHandler;
        this.repository = repository
    }
    public async signup(req: Request, res:Response, next: NextFunction) {
        const model: UserSignUpDTO  = plainToInstance(UserSignUpDTO, req.body as Object);
        const error = await validate(model);
        if(error.length>0){
        next(error);    
        }
        const result = await this.authHandler.signUp(model,req?.file);
        const file = req?.file;
        return sendResponse(res, 201, "User signed up succesfully",result);



            
        }
    public async confirmSignUp(req: Request, res: Response, next: NextFunction) {
        const model: ConfirmSignUpDto = plainToInstance(ConfirmSignUpDto, req.body);
        const error = await validate(model);
        if( error.length){
            next(error);
        }
        const result = await this.authHandler.confirmSignUp(model);
        await this.repository.updateUserVerficationStatus(model.username);
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