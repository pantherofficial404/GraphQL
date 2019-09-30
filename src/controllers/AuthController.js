const User = require('models/User');

const signup = async ({ ISignup }) => {
  let user = await User.findOne({ username: ISignup.username });
  if (user) {
    throw new Error('User is already exists');
  }
  else {
    user = await new User({
      username: ISignup.username,
      password: ISignup.password,
    }).save();
    return user;
  }
}

module.exports = {
  signup,
}