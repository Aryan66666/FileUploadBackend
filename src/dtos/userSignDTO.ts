import { IsEmail,  IsString, MinLength } from "class-validator";

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
