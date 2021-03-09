module.exports = (sequelize, DataTypes) => {
  const ProductProviders = sequelize.define('product_providers', {
    price: DataTypes.DECIMAL,
    available: DataTypes.BOOLEAN
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
  ProductProviders.associate = (models) =>  {
    ProductProviders.belongsTo(models.products, { foreignKey: 'product_id', onDelete: 'cascade' });
    ProductProviders.belongsTo(models.providers, { foreignKey: 'provider_id', onDelete: 'cascade' });
  };

  return ProductProviders;
};
