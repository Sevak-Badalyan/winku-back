import { SuccessHandlerUtil } from "../utils";
import { CommentsService } from "../services"
import { log } from "handlebars";

export default class CommentsController {
    static async getComments(req, res, next) {
        console.log(`req.body ${req.body}`);
        // console.log(`${req.headers}  req.headers`);
        try {
            const text = await CommentsService.getComments();
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }

    static async addComments(req, res, next) {

        try {
           
            const { comments_id,commentText,posts_id, user_id} = req.body;
            const data = await CommentsService.addComments({comments_id,commentText,posts_id , user_id});
            SuccessHandlerUtil.handleList(res, req, data);
        } catch (error) {
            next(error)
        }
    }
















}