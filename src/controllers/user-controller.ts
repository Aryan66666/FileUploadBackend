import { NextFunction, Request, Response } from "express";
import { AuthHandler } from "../utils/auth-handler";
import { UserSignUpDTO } from "../dtos/userSignDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { isNamedExportBindings } from "typescript";
import { sendResponse } from "../utils/response";

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
    }
