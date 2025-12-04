<script setup lang="ts">
import { ref, reactive } from 'vue'

const isLoginMode = ref(false)

const formData = reactive({
  username: '',
  password: '',
  email: '',
})

const errorMessage = ref('')

const toggleMode = () => {
  errorMessage.value = ''
  formData.username = ''
  formData.password = ''
  formData.email = ''

  isLoginMode.value = !isLoginMode.value
}

const handleSubmit = () => {
  errorMessage.value = ''

  if (!formData.username || !formData.password) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  if (!isLoginMode.value && !formData.email) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  if (formData.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  console.log(formData)

}
</script>

<template>
  <div class="page-wrapper">
    <div class="screen-container">
      <header class="header">
        <div class="logo-wrapper">
          <svg class="logo-heart" viewBox="0 0 512 512" xml:space="preserve">
            <path
              d="M460.5,94.3c-53.4-53.4-139.9-53.4-193.3,0L256,105.5l-11.2-11.2c-53.4-53.4-139.9-53.4-193.3,0s-53.4,139.9,0,193.3l204.5,204.5l204.5-204.5C513.9,234.2,513.9,147.7,460.5,94.3z"
            />
          </svg>
        </div>
        <h1 class="app-title">FATED</h1>
      </header>

      <main class="form-container">
        <nav class="tabs">
          <a
            href="#"
            class="tab"
            :class="[
              isLoginMode ? 'active-tab' : 'inactive-tab',
              { 'swap-to-right': !isLoginMode },
            ]"
            @click.prevent="isLoginMode = true"
          >
            LOGIN
          </a>

          <a
            href="#"
            class="tab"
            :class="[
              !isLoginMode ? 'active-tab' : 'inactive-tab',
              { 'swap-to-left': !isLoginMode },
            ]"
            @click.prevent="isLoginMode = false"
          >
            REGISTER
          </a>
        </nav>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <input
            v-model="formData.username"
            type="text"
            placeholder="User Name"
            class="form-input"
          />

          <input
            v-model="formData.password"
            type="password"
            placeholder="Password"
            class="form-input"
          />

          <Transition name="fade-only">
            <input
              v-if="!isLoginMode"
              v-model="formData.email"
              type="email"
              placeholder="Email"
              class="form-input email-input"
            />
          </Transition>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <span class="forgot-text">Forgot password ?</span>

          <button type="submit" class="btn-submit">
            {{ isLoginMode ? 'LOGIN' : 'REGISTER' }}
          </button>
        </form>
      </main>

      <footer class="footer">
        <Transition name="text-fade" mode="out-in">
          <p v-if="isLoginMode" key="login-text">
            Don't have An Account ? <a href="#" @click.prevent="toggleMode">Register</a>
          </p>
          <p v-else key="register-text">
            Already have An Account ? <a href="#" @click.prevent="toggleMode">Login</a>
          </p>
        </Transition>
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #ff5f5f;
  --page-bg: #ff5f5f;
  --white: #ffffff;
  --white-transparent: #f45f5f;
  --text-placeholder: #b0b0b0;
  --font-main: 'Roboto', sans-serif;
  --tab-gap: 15px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-main);
}
</style>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--page-bg);
}

.screen-container {
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 60px 30px 40px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

.logo-wrapper {
  width: 100px;
  height: 100px;
  background-color: var(--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.logo-heart {
  width: 55px;
  height: 55px;
  fill: var(--primary-color);
  transform: rotate(15deg);
}

.app-title {
  font-weight: 800;
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: var(--white);
}

.form-container {
  width: 100%;
  flex: 1;
}

.tabs {
  display: flex;
  gap: var(--tab-gap);
  margin-bottom: 30px;
  position: relative;
}

.tab {
  flex: 1;
  padding: 14px;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 8px;
  letter-spacing: 1px;
  cursor: pointer;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.5s ease,
    color 0.5s ease;
  z-index: 1;
}

.swap-to-right {
  transform: translateX(calc(100% + var(--tab-gap)));
  z-index: 0;
}

.swap-to-left {
  transform: translateX(calc(-100% - var(--tab-gap)));
  z-index: 10;
}

.active-tab {
  background-color: var(--white);
  color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.inactive-tab {
  background-color: var(--white-transparent);
  color: var(--white);
}

.inactive-tab:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

/* FORM */
.auth-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-input {
  background-color: var(--white);
  border: none;
  border-radius: 8px;
  padding: 18px 20px;
  margin-bottom: 15px;
  font-size: 1rem;
  width: 100%;
  outline: none;
  color: #333;
}

.email-input {
  margin-bottom: 15px;
}

.form-input::placeholder {
  color: var(--text-placeholder);
}

.error-message {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.forgot-text {
  align-self: flex-end;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 25px;
  cursor: default;
  user-select: none;
}

.btn-submit {
  background-color: var(--white);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  width: 100%;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.1s ease,
    opacity 0.2s ease;
}

.btn-submit:active {
  transform: scale(0.98);
}

.btn-submit:hover {
  opacity: 0.95;
}

.footer {
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.footer a {
  color: var(--white);
  font-weight: 800;
  text-decoration: none;
  margin-left: 5px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.footer a:hover {
  border-bottom: 1px solid var(--white);
}

.fade-only-enter-active,
.fade-only-leave-active {
  transition:
    opacity 0.4s ease,
    max-height 0.4s ease,
    margin-bottom 0.4s ease,
    padding 0.4s ease;
  overflow: hidden;
}

.fade-only-enter-from,
.fade-only-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.fade-only-enter-to,
.fade-only-leave-from {
  opacity: 1;
  max-height: 60px;
  margin-bottom: 15px;
}

.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.3s ease;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}
</style>
