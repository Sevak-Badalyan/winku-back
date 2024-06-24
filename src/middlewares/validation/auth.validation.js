import { AuthSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class AuthValidation {
  static validateLoginArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.loginSchema, next);
  }
  static validateRegisterArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.registerSchema, next);
  }
}

export default AuthValidation;
