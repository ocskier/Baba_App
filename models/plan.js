module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    subject: DataTypes.STRING,
    grade: DataTypes.STRING
  });
  Plan.associate = function(models) {
    Plan.belongsToMany(models.User, { through: models.UserPlan });
  };
  return Plan;
};
