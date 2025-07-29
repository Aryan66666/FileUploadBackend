import { IsEmail,  isString,  IsString, Length, MinLength } from "class-validator";
import { StringLiteral } from "typescript";

export class UserSignUpDTO {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @MinLength(8)
  confirmPassword!: string;

  @IsString()
  username!: string;

}

export class ConfirmSignUpDto {
  @IsString()
  username!: string;

  @IsString()
  @Length(6, 6)
  code!: string;
}
export class SignInDto {
  @IsString()
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

