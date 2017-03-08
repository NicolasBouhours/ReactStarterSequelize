const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

const config = require('../../config/const')
const handle = require('../utils/handle')
const User   = require('../models/user')

// ## Sign in User
function signin(req, res, next) {
  res.send('Signin')
  const { email, password } = req.body

  // Check if email and password are send
  if (!email || !password) {
    handle.handleError(res, 'Veuillez renseigner un email et un mot de passe', err)
    return false
  }

  // Find user on database
  User.findOne({ email: email})
  .then((user) => {

    // Si aucun utilisateur existe
    if (!user) {
      handle.handleError(res, 'Aucun utilisateur n\'existe pour ces identifiants', err)
      return false
    }

    // Compare password
    bcrypt.compare(password, user.hash)
    .then((res) => {
      if (res) {

        // create token
        const token = jwt.sign(user, config.SECRET, {
          expiresInMinutes: config.TOKEN_EXPIRATION
        })

        res.json({ success: true, message: 'Connexion effectuée avec succès', token })
      } else {
        handle.handleError(res, 'Mauvais mot de passe')
      }
    })
    .catch(err => handle.handleError(res, 'Impossible d\'effectuer la connexion', err))
  })
  .catch(err => handle.handleError(res, 'Impossible d\'effectuer la connexion', err))
}

// ## Sign up User
function signup(req, res, next) {
  const { email, password, firstname, lastname } = req.body

  // Check if all field are send
  if (!email || !password || !firstname || !lastname) {
    handle.handleError(res, 'Veuillez renseigner tout les champs requis', err)
    return false
  }

  // Find user on database
  User.findOne({ email: email})
  .then((user) => {

    // Si aucun utilisateur existe
    if (user) {
      handle.handleError(res, 'Un utilisateur existe déja pour cet email', err)
      return false
    }

    // Hash password
    bcrypt.hash(password, config.SALT_ROUNDS)
    .then((hash) => {

      // Create new user
      let user = new User({email, password, firstname, lastname, hash})

      // Save user
      user.save()
      .then(usr => handle.handleSuccess(res, 'Utilisateur crée avec succès'))
      .catch(err => handle.handleError(res, 'Impossible d\'effectuer la création de compte', err))
    })
    .catch(err => handle.handleError(res, 'Impossible d\'effectuer la création de compte', err))
  })
  .catch(err => handle.handleError(res, 'Impossible d\'effectuer la création de compte', err))
}

// ## Sign out User
function signout(req, res, next) {
  res.json({'message': 'signout'})
}

module.exports = { signin, signup }
