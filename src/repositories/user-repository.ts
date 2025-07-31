import { UserSignUpDTO } from "../dtos/userSignDTO";
import argon2d  from "argon2";
import UserModel from "../models/user-model";
import { AppError } from "../utils/error-handler";
export class UserRepository {
    public async createUser(userData: UserSignUpDTO): Promise<void> {
        const {username, email, userType} = userData;
        let password = userData.password;
        const name = userData?.name ??username;
        const profilePhoto = userData?.profilePhoto??null;
        const isVerified = false;
        password = await argon2d.hash(password);
        const user = {
            name: name,
            username: username,
            password: password,
            email: email,
            userType: +userType,
            profilePhoto: profilePhoto,
            isVerified: isVerified,
        
        }
        const userModel = new UserModel(user);
        await userModel.save();
        console.log("User created succesfully in the db");


    }
    public async updateUserVerficationStatus(username: string):Promise<void> {
        const user = await UserModel.findOne({username: username});
        if(!user){
            throw new AppError("User Not found", 404);
        }
        user.isVerified = true;
        await user.save();
        console.log("User verification status updated succesfully")
    }
}