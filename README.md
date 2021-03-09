# product-category-api

```
Mariadb
Joi
Swagger
Sequelize
Express
```

# Description
 A products, providers, and categories API
- a Category can be a parent or a child.
- a Product must belong to a single category.
- a Product can be supplied by zero or more provider.
- Each provider should supply a product by its own price.
- a Product can be featured inside its category.

## How To

Setup database
```sql
CREATE DATABASE <provide same name in .env file>;
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Start the server

```shell
npm i
npx sequelize-cli db:migrate  
npm run start:dev
```

## Features

- Database management with Sequelize
- list all products in a given category,
  a product's price should be the lowest available among its possible providers,
  return maximum n (defaults to 25) products per request, and enable pagination.
- write a middleware that enable pagination of results, it should be applicable to other
  endpoints that lists items, it should accept parameter `page` from query string and display the
  corresponding part of result set.
- end point that toggle (set/unset) a product as featured inside its category.

# In the future

- Finalize docker_compose
