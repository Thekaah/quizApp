<template>
    <div>
      <h2 style="text-align: center;">Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
  
        <button type="submit">Login</button><br>
        <button type="button" class="register" @click="goToRegister">Registrar</button><br>

      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    async login() {
      try {
        console.log("Enviando solicitação de login...");
        const response = await this.$http.post("/api/login", {
          username: this.username,
          password: this.password,
        });

        console.log("Resposta completa do servidor:", response);

        const responseBody = await response.text();
        console.log("Corpo da resposta:", responseBody);

        let token;
        let userId;
        let username; 
        try {
          const responseData = JSON.parse(responseBody);
          token = responseData.token;
          userId = responseData.userId;
          username = responseData.username; 
        } catch (error) {
          console.error("Erro ao analisar o corpo da resposta como JSON:", error);
        }

        if (token && userId && username) {
          console.log("Token encontrado:", token);
          console.log("UserId encontrado:", userId);
          console.log("Username encontrado:", username);

          // Armazene o token, userId e username no localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('username', username);

          this.$router.push("/quiz");
        } else {
          console.error("Token, UserId ou Username não encontrado na resposta:", response);
          this.error = "Token, UserId ou Username não encontrado na resposta.";
        }
      } catch (error) {
        // Trate os erros de autenticação
        console.error("Erro durante o login:", error);
        this.error = "Credenciais inválidas. Por favor, tente novamente.";
      }
    },
  },
};
</script>
</script>

  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
  }

  label {
    margin-top: 10px;
  }

  input {
    margin-bottom: 15px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    background-color: #1bc0c0;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }

  button:hover {
    background-color: #1bc0a0;
  }

  .register{
    background-color: blue;
  }

  .error {
    color: red;
    margin-top: 10px;
  }

  .register {
  background-color: blue;
  margin-top: 10px; 
}
</style>
