import {PostsModel} from "../models"

export default class PostsService {
    static async getPosts(id) {// {

        return await PostsModel.getPosts(id)
    }
    static async getPostsById(user_id) {// {

        return await PostsModel.getPostsById(user_id)
    }
    static async getPhotosById(user_id) {// {

        return await PostsModel.getPhotosById(user_id)
    }
    
    static async addPosts(data) {
        return await PostsModel.addPosts(data);
    }
    // static async deletePosts(id) {
    //     return await PostsModel.deletePosts(id);
    // }
    // static async updatePosts(id, update) {
    //     return await PostsModel.updatePosts(id, update);
    // }
   
}