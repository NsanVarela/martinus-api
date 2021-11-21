const express = require("express");
const app = express();
const port = process.env.PORT || 8082;
const cors = require("cors");
const bodyParser = require("body-parser");

require('./commands/loadEnvVariables')();

const routes = require('./routes/index');
const { checkConnection } = require('./services/db.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

const bootstrap = async () => {
  try {
    await checkConnection();
  } catch (err) {
    console.log(err.message);
  }
  app.listen({ port }, () => console.log(`🚀 Server Martinu's ready at http://localhost:${port}`));
};

bootstrap();