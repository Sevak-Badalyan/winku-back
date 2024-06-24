import {CommentsModel} from "../models"

export default class CommentsService {
    static async getComments() {// {




        return await CommentsModel.getComments()
    }
    static async addComments(data) {
        return await CommentsModel.addComments(data);
    }
    // static async deleteComments(id) {
    //     return await CommentsModel.deleteComments(id);
    // }
    // static async updateComments(id, update) {
    //     return await CommentsModel.updateComments(id, update);
    // }
   
}