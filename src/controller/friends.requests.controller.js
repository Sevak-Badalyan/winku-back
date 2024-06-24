import { SuccessHandlerUtil } from "../utils";
import { FriendsRequestsService } from "../services"
import { log } from "handlebars";

export default class FriendsRequestsController {
  static async getFriendsRequests(req, res, next) {
   
    try {
      const user_id= req.user_id;
      const requests = await FriendsRequestsService.getFriendsRequests(user_id);
      SuccessHandlerUtil.handleGet(res, req, requests)
    } catch (error) {
      next(error);
    }
  }

  static async addFriendsRequests(req, res, next) {

    try {
   const sender_id= req.user_id;
      const {receiver_id,statusFr } = req.body;
      const data = await FriendsRequestsService.addFriendsRequests({sender_id, receiver_id,statusFr});
      SuccessHandlerUtil.handleList(res, req, data);
    } catch (error) {
      next(error)
    }
  }

  static async addAnswerFriendsRequests(req, res, next) {

    try {
      const receiver_id= req.user_id;
      const {sender_id, statusFr } = req.body;
      const data = await FriendsRequestsService.addAnswerFriendsRequests({ sender_id,receiver_id,statusFr});
      SuccessHandlerUtil.handleList(res, req, data);
    } catch (error) {
      next(error)
    }
  }
  // static async deleteFriendsRequests(req, res, next) {
  //   try {
  //     const {request_id } = req.params;
  //     const data = await FriendsRequestsService.deleteFriendsRequests(request_id);
  //     SuccessHandlerUtil.handleList(res, req, data);
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
