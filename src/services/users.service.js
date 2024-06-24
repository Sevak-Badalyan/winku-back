import {UsersModel} from "../models"

export default class UsersService {
    static async getUsers() {
        return await UsersModel.getUsers()
    }


    static async getUsersById(id) {
        
        return await UsersModel.getUsersById(id);
    }

    static async editUsers(data) {
        return await UsersModel.editUsers(data)
    }
    static async searchUsers(data) {
        return await UsersModel.searchUsers(data)
    }

    // static async deleteUsers(id) {
    //     return await UsersModel.deleteUsers(id);
    // }
    // static async updateUsers(id, update) {
    //     return await UsersModel.updateUsers(id, update);
    // }
   
}