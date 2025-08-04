import { FileUploadDto } from "../dtos/file-share-dto";
import { FileRepository } from "../repositories/file-repository";
import { AwsService } from "../utils/aws-service";
import { AppError } from "../utils/error-handler";

export class FileService {
    constructor(private readonly repository: FileRepository,
        private readonly awsService: AwsService
    )
    {
        this.repository = repository;
        this.awsService = awsService;
    }
    public async uploadFile(fileUploadDto: FileUploadDto){
        if (!fileUploadDto.file){
            throw new AppError("File is a required field", 400);
        }
        if (!fileUploadDto.owner){
            throw new AppError("Owner is required", 400);
        }
        const {originalname, mimetype, size} = fileUploadDto.file;
        fileUploadDto.originalName = originalname;
        fileUploadDto.type = mimetype;
        fileUploadDto.size = size.toString();
        const _ = await this.awsService.uploadileToS3(fileUploadDto.file, `files/${fileUploadDto.storedName}`);
        fileUploadDto.storagePath = `files/${fileUploadDto.storedName}`;
        const savedFile = await this.repository.create(fileUploadDto);
        return savedFile;

    }
    public async getFileById(fileId: string){
        const file = await this.repository.getFileById(fileId);
        return file;
    }
    public async getAllFiles(){
        const files = await this.repository.getAllFiles();
        return files;
    }
    public async deleteFile(fileId: string){
        const file = await this.repository.deleteFile(fileId);
        return file;
    }
}