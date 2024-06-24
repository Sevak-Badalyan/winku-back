import AuthService from "./auth.service";
import { SuccessHandlerUtil, ErrorsUtil } from "../utils";

const { InputValidationError, UnauthorizedError } = ErrorsUtil;

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password, role ,name, surname, email, profileImg, coverImg, status, position} = req.body;
      if(!username || !password){
        throw new InputValidationError("Invalid username or password");
      }
      const loginResult = await AuthService.login( username, password, role ,name, surname, email, profileImg, coverImg, status, position);
      SuccessHandlerUtil.handleAdd(res, req, loginResult);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const refreshResult = await AuthService.refresh(refreshToken);
      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next){
    try {
      const { username, password, name, surname, email, role } = req.body;
      const regResult = await AuthService.register( username, password, name, surname, email, role );
      SuccessHandlerUtil.handleAdd(res, req, regResult);
    } catch (error) {
      next(error);
    }
  }

}
