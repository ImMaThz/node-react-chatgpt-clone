const express = require("express");
const promptController = require("./controllers/prompt-controller");

const routes = express.Router();

routes.get("/api/health", (req, res) => res.json({ status: "ok" }));
routes.post("/api/prompt", promptController.sendText);

module.exports = routes;
