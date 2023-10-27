const questions = [
    {
      id: 1,
      question: "Você recebeu uma mesada de R$ 10. O que você faz?",
      alternatives: ["Compra doces por R$ 8.", "Investe R$ 5 em uma economia de porquinho.", "Guarda o dinheiro e espera para comprar um brinquedo melhor."],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Você quer um brinquedo novo, mas ele custa R$ 50. O que você faz?",
      alternatives: ["Pede emprestado dinheiro para comprar agora.", "Economiza R$ 10 por semana até conseguir comprá-lo.", "Compra outro brinquedo mais barato imediatamente."],
      correctAnswer: 1,
    },
    {
    id: 3,
    question: "Você recebeu R$ 20 de presente de aniversário. O que você faz?",
    alternatives: ["Gasta tudo em jogos de videogame.", "Coloca metade do dinheiro em uma poupança.", "Compra um livro que você queria por R$ 15."],
    correctAnswer: 0, // Resposta correta é a primeira alternativa (índice 0).
  },
  {
    id: 4,
    question: "Você quer comprar um sorvete por R$ 5. O que você faz?",
    alternatives: ["Pede para seus pais comprarem para você.", "Usa R$ 2 do dinheiro que economizou.", "Espera até juntar R$ 5 em sua economia de porquinho."],
    correctAnswer: 1, // Resposta correta é a segunda alternativa (índice 1).
  },
  {
    id: 5,
    question: "Você encontra R$ 10 no chão. O que você faz?",
    alternatives: ["Gasta tudo em um lanche rápido.", "Devolve o dinheiro à pessoa que perdeu.", "Coloca R$ 5 em sua poupança e gasta R$ 5 em algo divertido."],
    correctAnswer: 1, // Resposta correta é a segunda alternativa (índice 1).
  },
  ];
  
  module.exports = questions;
  