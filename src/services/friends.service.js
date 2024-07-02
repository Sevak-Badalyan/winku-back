
import {FriendsModel} from "../models"

export default class FriendsService {
    static async getFriends(user_id) {
        return await FriendsModel.getFriends(user_id)
    }
    static async getFriendsMessage(id) {
        return await FriendsModel.getFriendsMessage(id)
    }
    static async getFriendsMessageById({id, friendships_id}) {
        return await FriendsModel.getFriendsMessageById({id, friendships_id})
    }
    static async getPeoples(user_id) {
        return await FriendsModel.getPeoples(user_id)
    }
   
    static async deleteFriends({user_id, friend_id}) {
        return await FriendsModel.deleteFriends({user_id, friend_id});
    }
   
}
