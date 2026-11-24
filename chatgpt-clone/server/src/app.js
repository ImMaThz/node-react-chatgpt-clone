const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());         // libera o front-end (porta 3000) para chamar a API
app.use(express.json()); // lê o corpo das requisições em JSON
app.use(routes);

module.exports = app;
