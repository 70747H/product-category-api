module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('categories', {
    name: DataTypes.STRING(45)
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true;
      }
    },
    paranoid: true,
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  // eslint-disable-next-line no-unused-vars
  Categories.associate = (models) =>  {
    Categories.hasOne(models.categories, { as: 'sub_categories', foreignKey: 'parent_id', onDelete: 'cascade' });
  };

  return Categories;
};
