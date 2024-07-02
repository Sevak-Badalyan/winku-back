import {CommentsModel} from "../models"

export default class CommentsService {
    static async getComments() {// {




        return await CommentsModel.getComments()
    }
    static async addComments(data) {
        return await CommentsModel.addComments(data);
    }
    
   
}