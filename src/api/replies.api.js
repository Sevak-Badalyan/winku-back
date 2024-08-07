import  express  from "express";
import { RepliesController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";

const router  = express.Router();
router.get('/',
AuthMiddlaware.authenticateFor(["Admin", "User"]),
RepliesController.getReplies );

router.post('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
RepliesController.addReplies );


export default router;
