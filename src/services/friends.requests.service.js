
import {FriendsRequestsModel} from "../models"

export default class FriendsRequestsService {
    static async getFriendsRequests(user_id) {
        return await FriendsRequestsModel.getFriendsRequests(user_id)
    }
    static async addFriendsRequests(data) {
        return await FriendsRequestsModel.addFriendsRequests(data);
    }
    static async addAnswerFriendsRequests(data) {
      return await FriendsRequestsModel.addAnswerFriendsRequests(data);
  }
    // static async deleteFriendsRequests(request_id) {
    //     return await FriendsRequestsModel.deleteFriendsRequests(request_id);
    // }
  
   
}


