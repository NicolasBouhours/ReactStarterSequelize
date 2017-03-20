const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

const config = require('../../config/const')
const handle = require('../utils/handle')
const models   = require('../models')

// ## Sign in models.User
function signin(req, res, next) {
  const { email, password } = req.body

  // Check if email and password are send
  if (!email || !password) {
    handle.handleError(res, 'Veuillez renseigner un email et un mot de passe', err)
    return false
  }

  // Find user on database
  models.User.findOne({ email: email})
  .then((user) => {

    // Si aucun utilisateur existe
    if (!user) {
      handle.handleError(res, 'Aucun utilisateur n\'existe pour ces identifiants', err)
      return false
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // create token
        const token = jwt.sign({ data: user.email }, config.SECRET, {
           expiresIn: '72h'
        })

        res.json({ success: true, message: 'Connexion effectuée avec succès', token })
      } else {
        handle.handleError(res, 'Mauvais mot de passe')
      }
    })
  })
  .catch(err => handle.handleError(res, 'Impossible d\'effectuer la connexion', err))
}

// ## Sign up User
function signup(req, res, next) {
  const { email, password, firstname, lastname } = req.body

  // Check if all field are send
  if (!email || !password || !firstname || !lastname) {
    handle.handleError(res, 'Veuillez renseigner tout les champs requis')
    return false
  }

  // Find user on database
  models.User.findOne({
    where: {
       email: email }
    })
  .then((user) => {

    // Si aucun utilisateur existe
    if (user) {
      handle.handleError(res, 'Un utilisateur existe déja pour cet email')
      return false
    }

    bcrypt.hash(password, config.SALT_ROUNDS, (err, hash) => {

        if (hash) {
          // Save user
          models.User.create({
            email, firstname, lastname, password: hash
          })
          .then(usr => handle.handleSuccess(res, 'Utilisateur crée avec succès'))
          .catch(err => handle.handleError(res, 'Impossible d\'effectuer la création de compte', err))
          return
        }

        handle.handleError(res, 'Impossible d\'effectuer la création de compte', err)
    })
  })
  .catch(err => handle.handleError(res, 'Impossible d\'effectuer la création de compte', err))
}

// ## Sign out User
function signout(req, res, next) {
  res.json({'message': 'signout'})
}

module.exports = { signin, signup }
