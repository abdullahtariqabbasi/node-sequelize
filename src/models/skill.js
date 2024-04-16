import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      Skill.belongsToMany(models.Project, { through: models.ProjectSkill, foreignKey: 'skillId' });
    }
  };
  Skill.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills',
  });
  return Skill;
};
