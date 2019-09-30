const AuthController = require('./AuthController');

const rootController = {
  signup: AuthController.signup,

}

module.exports = { rootController };