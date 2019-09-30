const { buildSchema } = require('graphql');
const { UserSchema } = require('schema');

const query = `type query {
  getUser:[TUser!]!
}`;

const mutation = `type mutation {
  signup(ISignup:ISignup):TUser!
  login(ILogin:ILogin):TUser!
}`

const router = `schema {
  query:query
  mutation:mutation
}`;

const schema = buildSchema(`
  ${UserSchema.TUser}
  ${UserSchema.ILogin}
  ${UserSchema.ISignup}

  ${query}
  ${mutation}
  ${router}
`);
module.exports = schema;