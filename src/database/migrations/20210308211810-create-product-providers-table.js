module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('product_providers'),
};
