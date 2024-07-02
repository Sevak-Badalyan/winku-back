import  express  from "express";
import { UsersController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";

const router  = express.Router();
router.get('/', 
AuthMiddlaware.authenticateFor(["Admin", "User"]),
UsersController.getUsers );

router.get('/:id',
AuthMiddlaware.authenticateFor(["Admin", "User"]),
UsersController.getUsersById );



router.post('/', 
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  UsersController.editUsers );

  router.post('/search', 
    AuthMiddlaware.authenticateFor(["Admin", "User"]),
    UsersController.searchUsers );
  

export default router