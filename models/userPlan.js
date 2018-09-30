module.exports = function(sequelize, DataTypes) {
  var UserPlan = sequelize.define("UserPlan", {
    role: DataTypes.STRING
  });
  return UserPlan;
};
