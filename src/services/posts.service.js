import {PostsModel} from "../models"

export default class PostsService {
    static async getPosts(id) {

        return await PostsModel.getPosts(id)
    }
    static async getPostsById(user_id) {

        return await PostsModel.getPostsById(user_id)
    }
    static async delPostsById(posts_id) {

        return await PostsModel.delPostsById(posts_id)
    }
    static async getPhotosById(user_id) {

        return await PostsModel.getPhotosById(user_id)
    }
    
    static async addPosts(data) {
        return await PostsModel.addPosts(data);
    }
  
   
}