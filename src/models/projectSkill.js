import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProjectSkill extends Model {
    static associate(models) {
      // No associations are defined in this model as it's just a join table
    }
  };
  ProjectSkill.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'skills',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'ProjectSkill',
    tableName: 'project_skills',
  });
  return ProjectSkill;
};
