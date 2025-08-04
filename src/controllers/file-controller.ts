import { NextFunction, Request, Response } from "express";
import { FileService } from "../services/file-service";
import { plainToInstance } from "class-transformer";
import { FileUploadDto } from "../dtos/file-share-dto";
import { AppError } from "../utils/error-handler";
import { validate } from "class-validator";
import { sendResponse } from "../utils/response";
import { UserRepository } from "../repositories/user-repository";

export class FileController {
    constructor(private readonly fileService: FileService) {
        this.fileService = fileService;
    }
    public async uploadFile(req: Request, res: Response, next: NextFunction) {
        const model = plainToInstance(FileUploadDto, req.body);
        if (!req.file) {
            throw new AppError("File is required", 400);
        }
        model.file = req.file;
        const error = await validate(model);
        if (error.length) {
            next(error);
        }
        const userRepository = new UserRepository();
        if (!model.owner) {
            const userId = await userRepository.getUserIdByUsername(process.env.USERNAME!);
            model.owner = userId;
        }
        if (!model.owner) {
            throw new AppError("Owner is required", 400);
        }
        const result = await this.fileService.uploadFile(model);
        return sendResponse(res, 201, "File uploaded successfully", result);
    }
    public async getFileById(req:Request, res:Response, next: NextFunction){
        const fileId = req.params.fileId;
        if(!fileId){
            throw new AppError("File Id is required", 400);
        }
        const file = await this.fileService.getFileById(fileId);
        return sendResponse(res, 200, "File fetched successfully", file);
    }
    public async getAllFiles(req:Request, res:Response, next: NextFunction){
        const files = await this.fileService.getAllFiles();
        return sendResponse(res, 200, "Files fetched successfully", files);
    }
    public async deleteFile(req: Request, res:Response, next: NextFunction) {
        const fileId = req.params.fileId;
        if(!fileId){
            throw new AppError("File Id is required", 400);
        }
        const file = await this.fileService.deleteFile(fileId);
        return sendResponse(res, 200, "File deleted successfully", file);
    }
    
}