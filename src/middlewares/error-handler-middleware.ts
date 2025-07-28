import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error-handler";

export async function errorHandler(err:AppError, req:Request, res:Response, next:NextFunction){
    console.error(err);
    return res.status(err.statusCode || 500).json({
  success: false,
  message: err.message || "Internal Server Error",
  error: process.env.NODE_ENV === "development" ? err : undefined,
});



}