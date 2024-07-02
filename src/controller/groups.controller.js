import { SuccessHandlerUtil } from "../utils";
import { GroupsService } from "../services"

export default class GroupsController {
  static async getGroups(req, res, next) {
    try {
      const id = req.user_id;
      const text = await GroupsService.getGroups(id);
      SuccessHandlerUtil.handleGet(res, req, text)
    } catch (error) {
      next(error);
    }
  }

  static async addGroups(req, res, next) {

    try {
      // const id = req.user_id;
      const { group_name } = req.body;
      const data = await GroupsService.addGroups({ group_name });
      SuccessHandlerUtil.handleList(res, req, data);
    } catch (error) {
      next(error)
    }
  }





}