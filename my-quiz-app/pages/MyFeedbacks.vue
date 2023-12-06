<!-- MyFeedbacks.vue -->

<template>
    <div>
      <h1>Meus Feedbacks</h1>
      <div class="button-container">
        <button class="button" @click="redirectToQuiz">Jogar</button>
        <button class="button" @click="redirectToMyFeedback">Feedbacks Gerais</button>
    </div>
      <table>
        <thead>
          <tr>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feedback in userFeedbacks" :key="feedback._id">
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
        userFeedbacks: [],
      };
    },
    methods: {
    redirectToQuiz() {
        this.$router.push('/quiz');
  },
    
    redirectToMyFeedback() {
        this.$router.push('/feedbacks');
  },
      async fetchUserFeedbacks() {
        const userId = localStorage.getItem('userId');
  
        try {
          if (!userId) {
            console.error("UserId não encontrado");
            return;
          }
  
          const response = await this.$http.$get(`/api/my-feedbacks?userId=${userId}`);
          console.log("Resposta da API:", response);
  
          if (Array.isArray(response)) {
            this.userFeedbacks = response;
          } else {
            console.error("Resposta da API não contém dados válidos:", response);
          }
        } catch (error) {
          console.error("Erro ao buscar feedbacks do usuário", error);
        }
      },
    },
    mounted() {
      this.fetchUserFeedbacks();
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
  