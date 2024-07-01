
import  express  from "express";
import { MembersController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
const router  = express.Router();


router.get('/:group_id', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
MembersController.getMembers);

router.get('/', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  MembersController.getGroups);

 
router.get('/message/:group_id', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  MembersController.getGroupsMessages);
  
router.post('/',                                                
AuthMiddlaware.authenticateFor(["Admin", "User"]),

 MembersController.addMembers );

 router.delete('/:group_id/user/:user_id', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  MembersController.delMembers);
   
export default router;

