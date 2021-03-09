
const express = require('express');

const router = express.Router();
const validate = require('../../middleware/joi-validation.middleware');
const { listSchema, updateSchema } = require('./products.schema');
const { pagination } = require('../../middleware/pagination.middleware');
const controller = require('./products.controller');

router.get('/products', validate(listSchema), pagination() ,controller.listController);
router.patch('/products/:id', validate(updateSchema), controller.updateController);

module.exports = router;
