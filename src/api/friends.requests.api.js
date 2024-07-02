
import  express  from "express";
import { FriendsRequestsController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
const router  = express.Router();


router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
FriendsRequestsController.getFriendsRequests );


router.post('/',                                                 //request uxxarkel
AuthMiddlaware.authenticateFor(["Admin", "User"]),

 FriendsRequestsController.addFriendsRequests );

 router.post('/answer',                                          //requestin patasxanle
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  
   FriendsRequestsController.addAnswerFriendsRequests );

   
  
      
export default router;

