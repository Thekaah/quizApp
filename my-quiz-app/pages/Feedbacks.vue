<template>
  <div>
    <h1>Feedbacks</h1>
    <div class="button-container">
      <button class="button" @click="redirectToQuiz">Jogar</button>
      <button class="button" @click="redirectToMyFeedback">Meus Feedbacks</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nome do Usuário</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in sortedFeedbacks" :key="feedback._id">
          <td>{{ feedback.username }}</td>
          <td>{{ feedback.score }}</td>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>
export default {
  data() {
    return {
      feedbacks: [], 
    };
  },
  computed: {
    sortedFeedbacks() {
      return this.feedbacks.sort((a, b) => b.score - a.score);
    },
  },
  methods: {
    redirectToQuiz() {
    this.$router.push('/quiz');
  },
    
  redirectToMyFeedback() {
    this.$router.push('/my-feedbacks');
  },
    async fetchFeedbacks() {
      try {
        console.log("Antes da solicitação HTTP");
        const response = await this.$http.$get("/api/feedbacks");
        console.log("Após a solicitação HTTP, dados recebidos:", response);
        this.feedbacks = response;
      } catch (error) {
        console.error("Erro ao buscar feedbacks", error);
      }
    },
  },
  mounted() {
    this.fetchFeedbacks();
  },
};
</script>
<style scoped>

div {
max-width: 800px;
margin: auto;
}

h1 {
text-align: center;
color: #333;
}

table {
width: 100%;
border-collapse: collapse;
margin-top: 20px;
}

th, td {
border: 1px solid #ddd;
padding: 10px;
text-align: left;
}

th {
background-color: #f2f2f2;
}

tr:nth-child(even) {
background-color: #f9f9f9;
}

.button {
  width: 100%;
  margin: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.button:hover {
  background-color: #45a049;
}
.button-container {
display: flex;
justify-content: center; 
align-items: center; 
margin-top: 20px; 
}
</style>
