const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db");
const Feedback = require("./models");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

sequelize.sync();

const questions = require("./questions");

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { score } = req.body;
    const feedback = await Feedback.create({ score });

    console.log("Feedback salvo no banco de dados:", feedback);

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Erro ao salvar feedback no banco de dados", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
