const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const questions = require("./questions");

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
