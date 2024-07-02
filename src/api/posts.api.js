import  express  from "express";
import { PostsController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
import ImageUploadMiddleware from "../middlewares/multer/multer.middleware";
const router  = express.Router();

// router.post('/',

// AuthMiddlaware.authenticateFor(["Admin", "User"]), PostsController.addPosts ,
// ImageUploadMiddleware.uploadPost(), (req, res) => {
//   try {
//     res.send('File uploaded successfully');
//   } catch (err) {
//     res.status(400).send('Error uploading file');
//   }
// });

router.post('/',
AuthMiddlaware.authenticateFor(["Admin", "User"]),
  ImageUploadMiddleware.uploadPost(), // Handle file upload
  async (req, res, next) => {
    try {
      // Call addPosts after the file upload
      await PostsController.addPosts(req, res, next);
    } catch (err) {
      next(err); // Pass the error to the error handler middleware
    }
  }
);



router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
 PostsController.getPosts );

 router.get('/:user_id', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
   PostsController.getPostsById );
 
   router.delete('/:posts_id', 
    AuthMiddlaware.authenticateFor(["Admin", "User"]),
     PostsController.delPostsById );
   

 router.get('/photos/:user_id', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
   PostsController.getPhotosById );





export default router