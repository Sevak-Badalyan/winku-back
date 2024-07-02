import  express  from "express";
import { CommentsController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
const router  = express.Router();
router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
CommentsController.getComments );

router.post('/',
AuthMiddlaware.authenticateFor(["Admin", "User"]),

 CommentsController.addComments );


export default router;
