const express = require('express');
const routes = require('./routes');
// import sequelize connection
// taking line 3 - 13 in connections.js and putting it in server.js to import the seqelize

const sequelize = require('./config/connection');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

