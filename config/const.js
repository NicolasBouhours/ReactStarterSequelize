const WEB_PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'
const SECRET = 'mysupersecret53'
const TOKEN_EXPIRATION = 4320
const SALT_ROUNDS = 10
const MYSQL = 'mysql://root:@localhost/kat'

module.exports = {
  WEB_PORT,
  ENV,
  SECRET,
  MYSQL,
  SALT_ROUNDS
}
