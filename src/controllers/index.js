const AuthController = require('./AuthController');

const rootController = {
  signup: AuthController.signup,
  login: AuthController.login,

}

module.exports = { rootController };