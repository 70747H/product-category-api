module.exports = (sequelize, DataTypes) => {
  const Providers = sequelize.define('providers', {
    name: DataTypes.STRING
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
  Providers.associate = (models) =>  {
    Providers.hasMany(models.product_providers, { foreignKey: 'provider_id', onDelete: 'cascade' });
  };

  return Providers;
};
