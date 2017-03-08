exports.handleError = ({ res, message = 'Une erreure est survenue', err = null }) => {
  res.json({ success: false, message, debug: err })
}

exports.handleSuccess = ({ res, message = 'Opération effectuée avec succès', result = null }) => {
  res.json({ sucess: true, message, result })
}
