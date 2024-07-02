import { SuccessHandlerUtil } from "../utils";
import { FriendsService } from "../services"
import { log } from "handlebars";

export default class FriendsController {
  static async getFriends(req, res, next) {

    try {
      const user_id= req.user_id;
      const data = await FriendsService.getFriends(user_id);
      SuccessHandlerUtil.handleGet(res, req, data)
    } catch (error) {
      next(error);
    }
  }

  static async getFriendsMessage(req, res, next) {

    try {
      const id= req.user_id;
      const data = await FriendsService.getFriendsMessage(id);
      SuccessHandlerUtil.handleGet(res, req, data)
    } catch (error) {
      next(error);
    }
  }

  static async getFriendsMessageById(req, res, next) {

    try {
      const id= req.user_id;
      const {  friendships_id } = req.params;
      const data = await FriendsService.getFriendsMessageById({id, friendships_id});
      SuccessHandlerUtil.handleGet(res, req, data)
    } catch (error) {
      next(error);
    }
  }
    static async getPeoples(req, res, next) {
  
      try {
        const user_id= req.user_id;
        const data = await FriendsService.getPeoples(user_id);
        SuccessHandlerUtil.handleGet(res, req, data)
      } catch (error) {
        next(error);
      }
    }
  

static async deleteFriends(req, res, next) {
  try {
    
    const {  friend_id } = req.params;
    const user_id= req.user_id;

      if (!user_id || !friend_id) {
          return res.status(400).json({ error: 'user_id and friend_id are required' });
      }

      const data = await FriendsService.deleteFriends({user_id, friend_id});
      SuccessHandlerUtil.handleList(res, req, data);
  } catch (error) {
      next(error);
  }
}
}












