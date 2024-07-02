import { SuccessHandlerUtil } from "../utils";
import { MembersService } from "../services"

export default class MembersController {
  static async getMembers(req, res, next) {             //im id ov stugel inch grupayum kam 
    try {                                                         //by group _id?
      // const id = req.user_id;
      const { group_id  } = req.params;

      const text = await MembersService.getMembers(group_id);
      SuccessHandlerUtil.handleGet(res, req, text)
    } catch (error) {
      next(error);
    }
  }

  static async getGroups(req, res, next) {            
    try {                                                        
      const id = req.user_id;
      const text = await MembersService.getGroups(id);
      SuccessHandlerUtil.handleGet(res, req, text)
    } catch (error) {
      next(error);
    }
  }

  static async getGroupsMessages(req, res, next) {             
    try {
      const {group_id} = req.params;
      const text = await MembersService.getGroupsMessages(group_id);
      SuccessHandlerUtil.handleGet(res, req, text)
    } catch (error) {
      next(error);
    }
  }

  static async addMembers(req, res, next) {

    try {
      // const id = req.user_id;
      const { group_id ,user_id } = req.body;
      const data = await MembersService.addMembers({ group_id ,user_id });
      SuccessHandlerUtil.handleList(res, req, data);
    } catch (error) {
      next(error)
    }
  }

  static async delMembers(req, res, next) {             
    try {                                                         
      const {group_id ,user_id } = req.params;
      // const {user_id } = req.body;

      if (! group_id|| !user_id) {
        return res.status(400).json({ error: `user_id and group_id are required user_id ${user_id} ,group_id ${group_id}` });
    }

      const data = await MembersService.delMembers({ group_id ,user_id });
      SuccessHandlerUtil.handleList(res, req, data)
    } catch (error) {
      next(error);
    }
  }



}