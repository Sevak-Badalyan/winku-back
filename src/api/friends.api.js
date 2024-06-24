
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
// router.post('/',
// AuthMiddlaware.authenticateFor(["Admin", "User"]),

//  FriendsController.addFriends );


export default router;





// import express from "express";
// import { FriendsController } from "../controller";
// import AuthMiddleware from "../auth/auth.middlware";

// const router = express.Router();

// // Middleware to authenticate Admin and User roles
// const authenticate = AuthMiddleware.authenticateFor(["Admin", "User"]);

// // Get friends for a user
// // router.get('/',
// //   authenticate,
// //   FriendsController.getFriends
// // );

// // Get friends by ID
// // router.get('/:id',
// //   authenticate,
// //   FriendsController.getFriendsById
// // );

// // Add a friend request
// router.post('/friend-requests',
//   authenticate,
//   FriendsController.addFriendRequest
// );

// // // Accept a friend request
// // router.post('/friend-requests/:id/accept',
// //   authenticate,
// //   FriendsController.acceptFriendRequest
// // );

// // // Reject a friend request
// // router.post('/friend-requests/:id/reject',
// //   authenticate,
// //   FriendsController.rejectFriendRequest
// // );

// // // Get friend requests for a user
// // router.get('/friend-requests/:user_id',
// //   authenticate,
// //   FriendsController.getFriendRequests
// // );

// export default router;
