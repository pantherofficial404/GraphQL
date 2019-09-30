const User = require('models/User');
const jwt = require('jsonwebtoken');
const config = require('config')

const signup = async ({ ISignup }) => {
  let user = await User.findOne({ username: ISignup.username });
  if (user) {
    throw new Error('User is already exists');
  }
  else {
    const expiresIn = Date.now() + 1000 * 60 * 60;
    const authInfo = {
      username: ISignup.username
    }
    const token = jwt.sign(authInfo, config.get('secret'), { expiresIn });
    user = await new User({
      username: ISignup.username,
      password: ISignup.password,
    }).save();
    return {
      username: user.username,
      _id: user._id,
      token,
      expiresIn
    };
  }
}

const login = async ({ ILogin }) => {
  const { username, password } = ILogin;
  let user = await User.findOne({ username, password });
  if (!user) {
    throw new Error('Invalid username or password');
  }
  const expiresIn = Date.now() + 1000 * 60 * 60;
  const authInfo = {
    username: username
  }
  const token = jwt.sign(authInfo, config.get('secret'), { expiresIn });
  return {
    username,
    token,
    expiresIn
  }
}


module.exports = {
  signup,
  login
}