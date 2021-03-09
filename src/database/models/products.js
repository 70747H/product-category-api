module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    image_uri: DataTypes.STRING,
    is_featured: DataTypes. BOOLEAN
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
  Products.associate = (models) =>  {
    Products.hasMany(models.product_providers, { foreignKey: 'product_id', onDelete: 'cascade' });
    Products.belongsTo(models.categories, { foreignKey: 'category_id', onDelete: 'cascade' });
  };

  return Products;
};
