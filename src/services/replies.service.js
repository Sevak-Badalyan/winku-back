import {RepliesModel} from "../models"

export default class RepliesService {
    static async getReplies() {// {




        return await RepliesModel.getReplies()
    }
    static async addReplies(data) {
        return await RepliesModel.addReplies(data);
    }
    // static async deleteReplies(id) {
    //     return await RepliesModel.deleteReplies(id);
    // }
    // static async updateReplies(id, update) {
    //     return await RepliesModel.updateReplies(id, update);
    // }
   
}