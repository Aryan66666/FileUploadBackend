import { NextFunction, Request, RequestHandler, Response } from "express";
import multer from "multer";
import { AppError } from "../utils/error-handler";

export const singleFileUpload: RequestHandler = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single('profilePhoto');

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;

  if (!file) {
  return next();
}
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  if (!allowedTypes.includes(file.mimetype)) {
    return next(new AppError('Invalid file type. Only JPEG, PNG, and PDF files are allowed.', 400));
  }

  if (file.size > 5 * 1024 * 1024) {
    return next(new AppError('File size exceeds the limit of 5 MB.', 400));
  }

  next(); 
};
