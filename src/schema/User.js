const TUser = `type TUser {
  username:String!
  _id:String!
  token:String
  expiresIn:String
}`;

const ILogin = `input ILogin {
  username:String!
  password:String!
}`

const ISignup = `input ISignup {
  username:String!
  password:String!
}`
module.exports = {
  TUser,
  ILogin,
  ISignup,
}