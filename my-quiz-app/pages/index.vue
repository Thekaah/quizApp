<template>
  <div class="geral">
    <div class="topo">
      <img class="logo" src="Logo.png" alt="logo" />
      <div class="nomeCria">Fulano da Silva</div>
      <img class="perfil" src="crianca.jpg" alt="criancaPerfil" />
    </div>
    <div class="corpo">
      <div class="carteira">Saldo: R$ {{ score }}</div>

      <div v-if="!gameCompleted" class="perguntas">
        <p>{{ currentQuestion ? currentQuestion.question : "" }}</p>
        <div class="alternativas">
          <button
            class="alternativa"
            :class="{ 'selecionada': selectedAnswer === index }"
            @click="selectAnswer(index)"
            v-for="(alt, index) in currentQuestion ? currentQuestion.alternatives : []"
            :key="index"
          >
            {{ alt }}
          </button>
        </div>
        <button v-if="!gameCompleted" class="verificar" @click="checkAnswer">Verificar Resposta</button>
      </div>

      <div class="resultado" v-if="gameCompleted">
        <div class="mensagem" :class="{ 'saldo-positivo': score >= 0, 'saldo-negativo': score < 0 }">
          {{ feedback }}
        </div>
      </div>

      <!-- Pop-up -->
      <div v-if="dialog" class="popup" :class="{'ganho': ganho > 0, 'perda': perda > 0}">
        <div class="popup-content">
          <p v-if="ganho > 0">Parabéns! Você ganhou R$ {{ ganho }}.</p>
          <p v-if="perda > 0">Infelizmente, você perdeu R$ {{ perda }}. Tente novamente!</p>
          <p v-if="ganho === 0 && perda === 0">Você não ganhou nem perdeu dinheiro.</p>
          <button class="fechar-popup" @click="fecharPopup">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 10,
      isLoading: false,
      gameCompleted: false,
      feedback: "",
      dialog: false,
      ganho: 0,
      perda: 0,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    async saveFeedbackToDatabase() {
      try {
        const response = await this.$http.$post("/api/feedback", {
          score: this.score,
        });
        console.log("Feedback salvo no banco de dados:", response);
      } catch (error) {
        console.error("Erro ao salvar feedback no banco de dados", error);
      }
    },
    async fetchQuestions() {
      try {
        this.isLoading = true;
        const response = await this.$http.$get("/api/questions");
        this.questions = response;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    checkAnswer() {
      const currentQuestion = this.currentQuestion;
      let ganho = 0;
      let perda = 0;

      if (this.selectedAnswer === 0) {
        if (this.currentQuestionIndex === 0) {
          perda = 8;
          this.score -= perda;
        } else if (this.currentQuestionIndex === 1) {
          perda = 100;
          this.score -= perda;
        } else if (this.currentQuestionIndex === 2) {
          perda = 20;
          this.score -= perda;
        } else if (this.currentQuestionIndex === 4) {
          perda = 10;
          this.score -= perda;
        }
      } else if (this.selectedAnswer === 1) {
        if (this.currentQuestionIndex === 0) {
          ganho = 5;
          this.score += ganho;
        } else if (this.currentQuestionIndex === 1) {
          ganho = 100;
          this.score += ganho;
        } else if (this.currentQuestionIndex === 4) {
          ganho = 50;
          this.score += ganho;
        }
      } else if (this.selectedAnswer === 2) {
        if (this.currentQuestionIndex === 2) {
          perda = 15;
          this.score -= perda;
        }
      }

      this.showPopup(ganho, perda);

      if (this.currentQuestionIndex + 1 < this.questions.length) {
        this.currentQuestionIndex++;
      } else {
        this.gameCompleted = true;
        this.calculateFeedback();
        this.saveFeedbackToDatabase();
        this.calculateGanho();
      }

      this.selectedAnswer = null;
    },

    showPopup(ganho, perda) {
      this.dialog = true;
      this.ganho = ganho;
      this.perda = perda;
    },

    fecharPopup() {
      this.dialog = false;
    },

    calculateFeedback() {
      if (this.score >= 0) {
        this.feedback = `Parabéns! Você terminou o jogo com um saldo positivo de R$ ${this.score}.`;
      } else {
        this.feedback = `Infelizmente, seu saldo final é negativo :C`;
      }
    },

    calculateGanho() {
      if (this.score > 0) {
        this.feedback = `Parabéns! Você ganhou R$ ${this.score}.`;
      } else if (this.score === 0) {
        this.feedback = "Você não ganhou nem perdeu dinheiro.";
      } else {
        this.feedback = `Infelizmente, você perdeu R$ ${Math.abs(this.score)}. Tente novamente!`;
      }
    },
  },
  async asyncData({ $http }) {
    const response = await $http.$get("/api/questions");
    return { questions: response };
  },
};
</script>
<style>
.topo {
  height: 120px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.logo {
  margin: 5px;
}

.nomeCria {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: aquamarine;
}

.perfil {
  width: 80px;
  height: auto;
  border-radius: 50%;
}

.corpo {
  height: 87vh;
  background-image: url('/fundo.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.carteira {
  background-color: green;
  color: white;
  display: flex;
  margin: 0 auto;
  height: 50px;
  width: 250px;
  text-align: center;
  padding: 5px;
  font-size: 25px;
  flex-direction: column;
  position: absolute;
  top: 150px; /* Ajuste conforme necessário */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.perguntas {
  background-color: #F0F27F;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: black;
  width: 700px;
  height: 300px;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.alternativas {
  display: flex;
  justify-content: center;
}

.alternativa {
  background-color: #f0f0f0;
  border: 1px solid #000;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  border-radius: 120px;
}

.alternativa.selecionada {
  background-color: #28e7e7;
}

.alternativa:hover {
  background-color: #d4d4d4;
}

.verificar {
  background-color: #1bc0c0;
  color: white;
  padding: 15px 40px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
}

.verificar:hover {
  background-color: #1bc0a0;
}

.jogo-concluido {
  font-size: 30px;
  font-weight: bold;
  color: green;
  margin-top: 20px;
}

.resultado {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%; /* Ajuste para ocupar toda a largura */
}

.mensagem {
  background-color: #3498db; /* Azul */
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
}

.saldo-positivo {
  background-color: #2ecc71; /* Verde */
}

.saldo-negativo {
  background-color: #e74c3c; /* Vermelho */
}


.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  z-index: 2;
}

.popup-content {
  font-size: 20px;
  margin-bottom: 10px;
}

.ganho {
  background-color: #2ecc71; /* Verde */
}

.perda {
  background-color: #e74c3c; /* Vermelho */
}

.fechar-popup {
  background-color: #3498db; /* Azul */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.fechar-popup:hover {
  background-color: #2980b9; /* Azul mais escuro */
}


</style>
