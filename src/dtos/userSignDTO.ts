import { IsEmail,  IsString, Length, MinLength } from "class-validator";

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
  @IsEmail()
  username!: string;

  @IsString()
  @Length(6, 6)
  code!: string;
}

