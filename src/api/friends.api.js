
import  express  from "express";
import { FriendsController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";
const router  = express.Router();
router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
FriendsController.getFriends );

router.get('/message', 
   AuthMiddlaware.authenticateFor(["Admin", "User"]),
   FriendsController.getFriendsMessage );

   router.get('/message/:friendships_id', 
      AuthMiddlaware.authenticateFor(["Admin", "User"]),
      FriendsController.getFriendsMessageById );
      
router.get('/explore-people', 
   AuthMiddlaware.authenticateFor(["Admin", "User"]),
   FriendsController.getPeoples );

   
router.delete('/:friend_id',
AuthMiddlaware.authenticateFor(["Admin", "User"]),
   FriendsController.deleteFriends );


export default router;



