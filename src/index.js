import "dotenv/config";
import cors from "cors";
import express from "express";

import config from './config';
import routes from './routes';
import models, { sequelize } from './models';
import { seedUsers } from './db/seeder';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.log(
    '\x1b[33m%s\x1b[0m', `${new Date().toLocaleString()} :: ${req.ip} :: ${req.hostname} :: ${req.method} :: ${req.originalUrl}`
  );
  req.context = {
    models,
    currentUser: await models.User.findByUsername('tonystark')
  };
  next();
});

// Routes
app.use('/users', routes.user);
app.use('/todos', routes.todo);
app.get('/*', function(req, res) {
  res.send('Ooops. Nothing there.');
});

const onSyncEraseDb = true;
sequelize.sync({ force: onSyncEraseDb }).then(async () => {
  if (onSyncEraseDb) {
    seedUsers(models);
  }
  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`);
  });
});
