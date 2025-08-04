import { IsArray, IsIn, IsString } from "class-validator";
import { StringLiteral } from "typescript";

export class FileUploadDto {

    originalName!: string;

    @IsString()
    storedName!: string;

    type!: string;

    size!: string;

    owner!: string;

    @IsString()
    @IsIn(['public', 'private'])
    visibility!: string;

    storagePath!: string;

    @IsString({each:true})
    @IsArray()
    tags!: string[];

    file!: Express.Multer.File;

}

export class GetLatestFilesDto{
    limit?: number;
    offset?: number;
}