import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, { foreignKey: 'userId' });
      Project.belongsToMany(models.Skill, { through: models.ProjectSkill, foreignKey: 'projectId' });
    }
  };
  Project.init({
    name: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  });
  return Project;
};
