import Sequelize from 'sequelize';

import config from '../config';

const sequelize = new Sequelize(
  config.pg_url,
  {
    dialect: 'postgres',
  },
);
const models = {
  User: sequelize.import('./user'),
  Todo: sequelize.import('./todo'),
};
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };
export default models;