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
    '\x1b[33m%s\x1b[0m', `${new Date().toLocaleString()} ${req.ip} :: ${req.hostname} :: ${req.method} :: ${req.originalUrl}`
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

// As per https://docs.docker.com/compose/startup-order/ the app is trying to re-establish
// connection to the database after failure instead of the wrapper script work around.
const initializeApp = () => {
  sequelize.sync({ force: onSyncEraseDb })
  .then(async () => {
    console.log('\x1b[32m', 'Connected to DB.');
    if (onSyncEraseDb) {
      seedUsers(models);
      console.log('\x1b[32m', 'Data seeding done.');
    }
    app.listen(config.port, () => {
      console.log('\x1b[32m', `App listening on port ${config.port}!`);
    });
  })
  .catch(error => {
    console.log('\x1b[31m%s\x1b[0m', `DB connection error occured: ${error.message}`);
    console.log('\x1b[31m%s\x1b[0m', 'Trying to reconnect...');
    setTimeout(() => {
      initializeApp();
    }, 500);
  });
}

initializeApp();
