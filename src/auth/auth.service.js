import jwt from "jsonwebtoken";
import { UserModel, AdminModels, EmployersModel } from "../models";
import { ErrorsUtil, CryptoUtil } from "../utils";
import nodemailer from "nodemailer";
import config from "../config/variables.config";

const { AUTH } = config;

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_ACTIVE_TIME, REFRESH_TOKEN_ACTIVE_TIME } = AUTH;

const { InputValidationError, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_ACTIVE_TIME});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_ACTIVE_TIME});

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);

    delete user.iat;
    delete user.exp;

    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    const payload = {
      accessToken,
      refreshToken,
      ...user,
    };
    return payload;
  }

  static async login(username, password) {
    if (username) {
      const user = await UserModel.findByUsername(username);
      if (!user) {
        throw new InputValidationError("Invalid username or password");
      }
      if (!CryptoUtil.isValidPassword(password, user.password)) {
        throw new InputValidationError("Invalid username or password");
      }
      delete user.password;
      const { accessToken, refreshToken } = AuthService.generateTokens({
        ...user,
      });

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        name:user.name,
        surname:user.surname,
        email:user.email,
        profileImg:user.profileImg,
        coverImg:user.coverImg,
        status:user.status,
        position:user.position,
        accessToken,
        refreshToken,
        // username, password, role ,name, surname, email, profileImg, coverImg, status, position
      };

      return payload;
    } else {
      const user = await UserModel.findByEmail(username);
      if (!user) throw new InputValidationError("Invalid username or password");
      if (!CryptoUtil.isValidPassword(password, user.password)) {
        throw new InputValidationError("Invalid username or password");
      }
      delete user.password;
      const { accessToken, refreshToken } = AuthService.generateTokens({
        ...user,
      });

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        accessToken,
        refreshToken,
      };
      return payload;
    }
  }

  static async register(username, password, name, surname, email, role){
    const user = await UserModel.findByUsername(username);
    // const usermail = await UserModel.findByEmail(email);
    if (user ) {
      throw new Error("User already exists!");

    } 
    const newUser = await UserModel.addUser(username, password, name, surname, email, role);
    return newUser;
  }
}
