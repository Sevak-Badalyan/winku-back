import express from "express";
import imageUploadMiddleware from '../middlewares/multer/multer.middleware'
import AuthMiddlaware from "../auth/auth.middlware";

const router = express.Router();

router.post('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
imageUploadMiddleware.upload(), (req, res) => {
    try {
      res.send('File uploaded successfully');
    } catch (err) {
      res.status(400).send('Error uploading file');
    }
  })


export default router;


