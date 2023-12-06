const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.sendStatus(401);

  jwt.verify(token.replace("Bearer ", ""), "secreto", async (err, user) => {
    if (err) {
      console.error("Erro ao verificar o token:", err);
      return res.sendStatus(401);
    }

    try {
      const existingUser = await User.findById(user.userId);
      if (!existingUser) {
        console.error("Usuário não encontrado");
        return res.status(404).send("Usuário não encontrado");
      }

      req.user = existingUser;
      next();
    } catch (error) {
      console.error("Erro ao verificar o usuário:", error);
      res.sendStatus(500);
    }
  });
};

// Conexão com o MongoDB usando o mongoose
mongoose.connect("mongodb+srv://LucianoIFSP:74356555@cluster0.ldvgzor.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
});

// Definição do modelo do usuário
const User = mongoose.model("User", {
  username: String,
  password: String,
});

// Definição do modelo de feedback
const Feedback = mongoose.model("Feedback", {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  score: Number,
});

const questions = require("./questions");

//Chamando as perguntas
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

//Salvando o feedback do usuario
app.post("/api/feedback", authenticateToken, async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user._id;
    const username = req.user.username;

    const feedback = await Feedback.create({ user: userId, username, score });

    console.log("Feedback salvo no banco de dados:", feedback);

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Erro ao salvar feedback no banco de dados", error);
    res.status(500).send("Erro interno do servidor");
  }
});

//Chamando os feedbacks de todos usuarios do MongoDB
app.get("/api/feedbacks", async (req, res) => {
  console.log("Chamada para /api/feedbacks recebida");
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Erro ao obter feedbacks", error);
    res.status(500).send("Erro ao obter feedbacks");
  }
});

//Chamando os feedbacks do usuario logado
app.get("/api/my-feedbacks", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("Chamada para /api/my-feedbacks recebida. userId:", userId);

    const userFeedbacks = await Feedback.find({ user: userId });
    console.log("Feedbacks encontrados:", userFeedbacks);

    res.json(userFeedbacks);
  } catch (error) {
    console.error("Erro ao buscar feedbacks do usuário", error);
    res.status(500).send("Erro ao buscar feedbacks do usuário");
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Dados de login recebidos:", { username, password });

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("Erro: Credenciais inválidas");
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, "secreto", { expiresIn: "1h" });
    console.log("Token gerado:", token);

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(401).json({ error: "Credenciais inválidas. Por favor, tente novamente." });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já registrado." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.json(newUser);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
