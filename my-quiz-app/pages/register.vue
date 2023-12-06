<!-- pages/register.vue -->

<template>
  <div class="register-container">
    <h2 style="text-align: center;">Registro</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <button type="submit">Registrar</button>
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
    async register() {
      try {
        const response = await this.$http.post("/api/register", {
          username: this.username,
          password: this.password,
        });

        this.$router.push("/login");
      } catch (error) {
        this.error = "Erro ao registrar. Por favor, tente novamente.";
      }
    },
  },
};
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
