
import  express  from "express";
import { GroupsController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
const router  = express.Router();


router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
GroupsController.getGroups);


router.post('/',                                                
AuthMiddlaware.authenticateFor(["Admin", "User"]),

 GroupsController.addGroups );

   
export default router;

