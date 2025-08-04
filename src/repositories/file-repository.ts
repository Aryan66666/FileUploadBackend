import { FileUploadDto, GetLatestFilesDto } from "../dtos/file-share-dto"
import FileModel from "../models/file-model"
import { AppError } from "../utils/error-handler"

export class FileRepository {
    create = async(fileUploadDto: FileUploadDto) => {
        const file = new FileModel({
            originalName: fileUploadDto.originalName,
            storedName: fileUploadDto.storedName,
            type: fileUploadDto.type,
            size: fileUploadDto.size,
            owner: fileUploadDto.owner,
            visibility: fileUploadDto.visibility,
            storagePath: fileUploadDto.storagePath,
            tags: fileUploadDto.tags,
        })

        const savedFile = await file.save();
        console.log("File created Successfully")
        return savedFile; 

    }

    getFileById = async(fileId: string) => {
        const file = await FileModel.findById(fileId);
        if(!file){
            throw new AppError("File not found", 404);
        }
        return file;
    }

    getAllFiles = async() => {
        const files = await FileModel.find();
        if(!files || files.length === 0){
            throw new AppError("No files found", 404);
        }
        return files;

    }

    getAllFilesByOwner = async(ownerId: string) => {
        const files = await FileModel.find({owner: ownerId});
        if(!files || !files.length) {
            throw new AppError("No files found for this owner", 404);
        }
        return files;

    }
    

    getLatestFiles = async(dto: GetLatestFilesDto) => {
        const { limit = 10, offset = 0 } = dto;
        const files = await FileModel.find()
            .sort({createdAt: -1})
            .skip(offset)
            .limit(limit);
        if(!files || !files.length){
            throw new AppError("No files found", 404);
        }
        return files;

    }
    deleteFile = async(fileId: string) => {
        const file = await FileModel.findById(fileId);
        if(!file){
            throw new AppError("File not found", 404);
        }
        const deletedFile = await file.deleteOne();
        return deletedFile;
    }
}