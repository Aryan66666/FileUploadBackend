import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { AuthHandler } from "../utils/auth-handler";
import { AwsService } from "../utils/aws-service";

const router =   Router();
const awsService:AwsService = new AwsService();
const authService: AuthHandler = new AuthHandler(awsService);

const controller:UserController = new UserController(authService);

router
  .post("/signup", controller.signup.bind(controller))
  .post("/confirm-signup", controller.confirmSignUp.bind(controller))
  .post("/resend-confirmation-code", controller.resendConfirmationCode.bind(controller))

export default router;