import {GroupsModel} from "../models"

export default class GroupsService {
    static async getGroups(id) {
        return await GroupsModel.getGroups(id)
    }
    // static async getGroupsMessages(data) {
    //     return await GroupsModel.getGroupsMessages(data)
    // }
    static async addGroups(data) {
        return await GroupsModel.addGroups(data);
    }
   
}