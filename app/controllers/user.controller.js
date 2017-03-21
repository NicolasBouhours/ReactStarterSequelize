const models   = require('../models')
const handle = require('../utils/handle')

function getProfile(req, res, next) {
  models.User.findOne({id: req.payload.data})
    .then((user) => {
      res.json(user.toJSON())
    })
    .catch((err) => handle.handleError(res, 'Impossible de récupèrer les informations utilisateur', err))
}

function updateProfile(req, res, next) {
  let { firstname, lastname } = req.body

  if(!firstname || !lastname) {
    handle.handleError(res, 'Veuillez renseigner tout les champs requis')
    return false
  }

  models.User.findById(req.payload.data)
  .then((user) => {
    if (!user) {
      handle.handleError(res, 'Impossible de récupèrer les informations utilisateur')
      return false
    }

    user.update({ firstname, lastname })
      .then((user) => handle.handleSuccess(res, 'Utilisateur mis a jour avec succès', user.toJSON()))
      .catch((err) => handle.handleError(res, 'Impossible de mettre à jour l\'utilisateur', err))
  })
  .catch((err) => { handle.handleError(res, 'Impossible de récupèrer les informations utilisateur', err)})
}

module.exports = { getProfile, updateProfile }
