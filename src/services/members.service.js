import {MembersModel} from "../models"

export default class MembersService {
    static async getMembers(group_id) {
        return await MembersModel.getMembers(group_id)
    }
    static async getGroups(id) {
        return await MembersModel.getGroups(id)
    }
    static async getGroupsMessages(data) {
        return await MembersModel.getGroupsMessages(data)
    }
    static async addMembers(data) {
        return await MembersModel.addMembers(data);
    }
    static async delMembers(data) {
        return await MembersModel.delMembers(data);
    }
   
}