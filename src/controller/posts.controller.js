import { SuccessHandlerUtil } from "../utils";
import { PostsService } from "../services"
import { log } from "handlebars";

export default class PostsController {
    static async getPosts(req, res, next) {
        const id= req.user_id;
        // console.log(`req.body ${req.body}`);
        // console.log(`${req.headers}  req.headers`);
        try {
            const text = await PostsService.getPosts(id);
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }

    static async getPostsById(req, res, next) {
        const { user_id } = req.params;
        try {
            const text = await PostsService.getPostsById(user_id);
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }

    static async delPostsById(req, res, next) {
        const { posts_id} = req.params;
        try {
            const text = await PostsService.delPostsById(posts_id);
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }

    static async getPhotosById(req, res, next) {
        const { user_id } = req.params;
        try {
            const text = await PostsService.getPhotosById(user_id);
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }


    
    static async addPosts(req, res, next) {

        try {
           


            const { postText, postPhoto, likeCount, commentCount, user_id, type} = req.body;
            const data = await PostsService.addPosts({ postText, postPhoto, likeCount, commentCount, user_id, type});
            SuccessHandlerUtil.handleList(res, req, data);
        } catch (error) {
            next(error)
        }
    }

















    // static async deletePosts(req, res, next){
    //   try {
    //       const { id } = req.params;
    //       const data = await PostsService.deletePosts(id);
    //       SuccessHandlerUtil.handleList(res, req, data);
    //   } catch (error) {
    //       next(error)
    //   }
    // }

    // static async updatePosts(req, res, next) {
    //   try {
    //       const {id} = req.params;
    //       const {vernagir, nkar, gin} = req.body;
    //       const data = await PostsService.updatePosts(id,{vernagir, nkar, gin});
    //       SuccessHandlerUtil.handleUpdate(res, req, data);
    //   } catch (error) {
    //       next(error)
    //   }
    // }

}