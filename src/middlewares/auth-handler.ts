import { Request } from "express";
import { AppError } from "../utils/error-handler";
import { verifyCognitoJwt } from "../utils/jwks-utiity";

export class AuthHandler {


  public static async verifyJwtToken(req: Request) {
    try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token){
        throw new AppError('No Token Provided', 400);
    }
    const payload = await verifyCognitoJwt(token);
      return payload;
    } catch (err) {
      console.error(' Invalid Token:', err);
      throw new AppError('Unauthorized', 401);
    }
  }
}


