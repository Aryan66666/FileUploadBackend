import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { AuthService } from "../utils/auth-service";
import { AwsService } from "../utils/aws-service";
import { UserRepository } from "../repositories/user-repository";
import { singleFileUpload, validateFile } from "../middlewares/multer-service";

const router =   Router();
const awsService:AwsService = new AwsService();
const repository:UserRepository = new UserRepository();
const authService: AuthService = new AuthService(awsService, repository);

const controller:UserController = new UserController(authService, repository);

router
  .post("/signup",singleFileUpload,validateFile, controller.signup.bind(controller))
  .post("/confirm-signup", controller.confirmSignUp.bind(controller))
  .post("/resend-confirmation-code", controller.resendConfirmationCode.bind(controller))
  .post("/sign-in", controller.signIn.bind(controller));

export default router;
