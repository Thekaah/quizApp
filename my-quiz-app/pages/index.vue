<template>
  <div class="geral">
    <div class="topo">
      <img class="logo" src="Logo.png" alt="logo" />
      <div class="nomeCria">Fulano da Silva</div>
      <img class="perfil" src="crianca.jpg" alt="criancaPerfil" />
    </div>
    <div class="corpo">
      <div class="carteira">Saldo: R$ {{ score }}</div>
      <div class="perguntas" v-if="!gameCompleted">
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
        <button class="verificar" @click="checkAnswer">Verificar Resposta</button>
      </div>
      <div v-else class="jogo-concluido">Jogo Concluído :D</div>
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
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
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

  if (this.selectedAnswer === 0) {
    if (this.currentQuestionIndex === 0) {
      this.score -= 8;
    } else if (this.currentQuestionIndex === 1) {
      this.score -= 100;
    } else if (this.currentQuestionIndex === 2) {
      this.score -= 20;
    } else if (this.currentQuestionIndex === 4) {
      this.score -= 10;
    }
  } else if (this.selectedAnswer === 1) {
    if (this.currentQuestionIndex === 0) {
      this.score += 5;
    } else if (this.currentQuestionIndex === 1) {
      this.score += 100;
    } else if (this.currentQuestionIndex === 4) {
      this.score += 50;
    }
  } else if (this.selectedAnswer === 2) {
    if (this.currentQuestionIndex === 0) {
    } else if (this.currentQuestionIndex === 2) {
      this.score -= 15;
    }
  }

  if (this.currentQuestionIndex + 1 < this.questions.length) {
    this.currentQuestionIndex++;
  } else {
    this.gameCompleted = true;
  }

  this.selectedAnswer = null;
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

</style>
