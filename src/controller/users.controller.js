import { SuccessHandlerUtil } from "../utils";
import { UsersService } from "../services"
import { log } from "handlebars";

export default class UsersController {
    static async getUsers(req, res, next) {
        console.log(`req.body ${req.body}`);
        // console.log(`${req.headers}  req.headers`);
        try {
            const text = await UsersService.getUsers();
            SuccessHandlerUtil.handleGet(res, req, text)
        } catch (error) {
            next(error);
        }
    }
    static async getUsersById(req, res, next) {
      try {
        const { id } = req.params;
        const user = await UsersService.getUsersById(id);
        delete user.password;
        SuccessHandlerUtil.handleGet(res, next, { ...user });
      } catch (error) {
        next(error);
      }
    }



    static async editUsers(req, res, next) {

      try {
     const id= req.user_id;

        const { name, surname, position  } = req.body;
        const data = await UsersService.editUsers({id, name, surname, position });
        SuccessHandlerUtil.handleList(res, req, data);
      } catch (error) {
        next(error)
      }
    }
    

    static async searchUsers(req, res, next) {

      try {
     const id= req.user_id;

        const { searchText  } = req.body;
        const data = await UsersService.searchUsers({id, searchText });
        SuccessHandlerUtil.handleList(res, req, data);
      } catch (error) {
        next(error)
      }
    }
    


      // console.log(`${req.headers}  req.headers`);
  //     try {
  //         const text = await UsersService.getUsersById();
  //         SuccessHandlerUtil.handleGet(res, req, text)
  //     } catch (error) {
  //         next(error);
  //     }
  // }




    // static async addUsers(req, res, next) {

    //     try {
           


    //         const { postText, postPhoto, likeCount, commentCount, user_id} = req.body;
    //         const data = await UsersService.addUsers({ postText, postPhoto, likeCount, commentCount, user_id});
    //         SuccessHandlerUtil.handleList(res, req, data);
    //     } catch (error) {
    //         next(error)
    //     }
    // }

















    // static async deleteUsers(req, res, next){
    //   try {
    //       const { id } = req.params;
    //       const data = await UsersService.deleteUsers(id);
    //       SuccessHandlerUtil.handleList(res, req, data);
    //   } catch (error) {
    //       next(error)
    //   }
    // }

    // static async updateUsers(req, res, next) {
    //   try {
    //       const {id} = req.params;
    //       const {vernagir, nkar, gin} = req.body;
    //       const data = await UsersService.updateUsers(id,{vernagir, nkar, gin});
    //       SuccessHandlerUtil.handleUpdate(res, req, data);
    //   } catch (error) {
    //       next(error)
    //   }
    // }

}