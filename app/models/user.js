module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {type: DataTypes.STRING(80), unique: true},
    firstname: {type: DataTypes.STRING(50), allowNull: false},
    lastname: {type: DataTypes.STRING(50), allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
  }, {
      freezeTableName: true
  })

  return User
}
