import { RepliesModel } from "../models"

export default class RepliesService {
    static async getReplies() {
        return await RepliesModel.getReplies()
    }
    static async addReplies(data) {
        return await RepliesModel.addReplies(data);
    }
}