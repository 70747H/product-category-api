const models = require('../../database/models');

const Products = models.products;
const ProductProviders = models.product_providers;

function listService(whereConditions, productWhereConditions, offset, limit) {
  const include = [
    {
      model: Products,
      required: true,
      where: productWhereConditions
    }
  ];
  return ProductProviders.findAndCountAll({
    distinct: true,
    attributes: ['price', 'available'],
    where: whereConditions,
    include,
    order: [['price']],
    limit,
    offset
  });
}

function fetchService(whereConditions) {
  return Products.findOne({
    where: whereConditions,
  });
}

function updateService(product, newProduct) {
  Object.assign(product, newProduct);
  return product.save();
}

module.exports = {
  listService,
  fetchService,
  updateService
};
