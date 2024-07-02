import {GroupsModel} from "../models"

export default class GroupsService {
    static async getGroups(id) {
        return await GroupsModel.getGroups(id)
    }
 
    static async addGroups(data) {
        return await GroupsModel.addGroups(data);
    }
   
}