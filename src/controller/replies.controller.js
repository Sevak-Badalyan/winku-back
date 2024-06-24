import { SuccessHandlerUtil } from "../utils";
import { RepliesService } from "../services"
import { log } from "handlebars";

export default class RepliesController {
  static async getReplies(req, res, next) {
    console.log(`req.body ${req.body}`);
    // console.log(`${req.headers}  req.headers`);
    try {
      const text = await RepliesService.getReplies();
      SuccessHandlerUtil.handleGet(res, req, text)
    } catch (error) {
      next(error);
    }
  }

  static async addReplies(req, res, next) {

    try {
      const { replies_id, repliesText, comments_id, user_id } = req.body;
      const data = await RepliesService.addReplies({ replies_id, repliesText, comments_id, user_id });
      console.log(data);
      SuccessHandlerUtil.handleList(res, req, data);
    } catch (error) {
      next(error)
    }
  }

















  // static async deleteReplies(req, res, next){
  //   try {
  //       const { id } = req.params;
  //       const data = await RepliesService.deleteReplies(id);
  //       SuccessHandlerUtil.handleList(res, req, data);
  //   } catch (error) {
  //       next(error)
  //   }
  // }

  // static async updateReplies(req, res, next) {
  //   try {
  //       const {id} = req.params;
  //       const {vernagir, nkar, gin} = req.body;
  //       const data = await RepliesService.updateReplies(id,{vernagir, nkar, gin});
  //       SuccessHandlerUtil.handleUpdate(res, req, data);
  //   } catch (error) {
  //       next(error)
  //   }
  // }

}