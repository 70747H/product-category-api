const {Op} = require('sequelize');

const {formatResponse} = require('../../helpers/response.helper');
const service = require('./products.service');
const GeneralException = require('../../exceptions/general.exception');
const HttpResponses = require('../../constants/http-responses.constants');

async function listController(req, res, next) {
  const reqQuery = req.query;
  let query = {};
  let productQuery = {};
  let response = {};
  const currentPage = reqQuery.page;
  const offset = reqQuery.offset;
  const pageLimit = reqQuery.limit;

  if (reqQuery.search)
    productQuery = {
      [Op.or]: [{
        name: {[Op.like]: `%${reqQuery.search}%`}
      }]
    };

  if (reqQuery.name)
    productQuery.name = {[Op.like]: `%${reqQuery.name}%`};

  if (reqQuery.categoryId)
    productQuery.category_id = reqQuery.categoryId;

  try {
    response = await service.listService(query, productQuery, offset, pageLimit);
    response.rows = await Promise.all(response.rows.map( async item => {
      const plainItem = await item.get({ plain: true });
      const productDetails = plainItem.product;
      delete plainItem.product;

      return {
        ...productDetails,
        ...plainItem
      };
    }));

    response.current_page = currentPage;
    response.item_count = pageLimit;
    return res.status(HttpResponses.OK.code).json(formatResponse(response));
  } catch (e) {
    return next(e);
  }
}

async function updateController(req, res, next) {
  const reqBody = req.body;
  const { id } = req.params;
  const query = { id };
  const updateObject = reqBody;
  let response = {};

  try {
    const product = await service.fetchService(query);
    if (!product)
      return next(GeneralException.NotFoundError('Invalid Id'));
    const updatedProduct = await service.updateService(product, updateObject);

    response = await updatedProduct.reload();
    response = response.get({ plain: true });

    return res.status(HttpResponses.OK.code).json(formatResponse(response));
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  listController,
  updateController
};
