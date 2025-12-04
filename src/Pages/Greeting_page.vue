<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Імпорт картинок
import TalkCopleImg from '../Images/Talk_Cople.png'
import CuddleMensImg from '../Images/cuddle_Mens.png'
import RainCopleImg from '../Images/Rain_Cople.png'

const router = useRouter()
const currentSlideIndex = ref(0)

const slides = [
  {
    title: 'MEET NEW PEOPLE',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image_src: TalkCopleImg,
  },
  {
    title: 'MATCH & CHAT',
    description:
      'It is a long established fact that a reader will be distracted by the readable content.',
    image_src: CuddleMensImg,
  },
  {
    title: 'FIND YOUR LOVE',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
    image_src: RainCopleImg,
  },
]

const currentSlide = computed(() => slides[currentSlideIndex.value])

const nextSlide = () => {
  if (currentSlideIndex.value < slides.length - 1) {
    currentSlideIndex.value++
  } else {
    finishGreeting()
  }
}

const setCurrentSlide = (index: number) => {
  currentSlideIndex.value = index
}

const finishGreeting = () => {
  router.push({ name: 'auth' })
}
</script>

<template>
  <div class="page-wrapper">
    <div class="screen-container">
      <Transition name="slide-fade" mode="out-in">
        <main class="main-content" :key="currentSlideIndex">
          <div class="illustration-wrapper">
            <img :src="currentSlide?.image_src" alt="Illustration" class="slide-image" />
          </div>

          <div class="text-content">
            <h1 class="title">{{ currentSlide?.title }}</h1>
            <p class="description">
              {{ currentSlide?.description }}
            </p>
          </div>
        </main>
      </Transition>

      <footer class="footer-nav">
        <a href="#" class="skip-btn" @click.prevent="finishGreeting">SKIP</a>

        <div class="pagination-dots">
          <span
            v-for="(slide, index) in slides"
            :key="index"
            class="dot"
            :class="{ active: index === currentSlideIndex }"
            @click="setCurrentSlide(index)"
          ></span>
        </div>

        <a href="#" class="next-btn" @click.prevent="nextSlide">NEXT</a>
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #f86d70;
  --white: #ffffff;
  --text-light: #aaaaaa;
  --text-normal: #888888;
  --bg-inactive: #e0e0e0;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
</style>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background-color: var(--white);
}

.screen-container {
  width: 100%;
  max-width: 420px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.main-content {
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 0; 
  overflow: hidden; 
}

.illustration-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 50vh;
  margin-bottom: 20px;
}

.slide-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
}
.text-content {
  flex-shrink: 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}

.title {
  background-color: var(--primary-color);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 15px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(248, 109, 112, 0.2);
}

.description {
  font-size: 0.9rem; 
  text-align: center;
  line-height: 1.5;
  color: var(--text-normal);
  max-width: 360px;
}

.footer-nav {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-top: 1px solid #f0f0f0;
  background: white;
  z-index: 10;
}

.skip-btn {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-light);
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.next-btn {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--white);
  background-color: var(--primary-color);
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(248, 109, 112, 0.3);
  cursor: pointer;
}

.next-btn:active {
  transform: scale(0.95);
}

.pagination-dots {
  display: flex;
  gap: 8px;
  padding: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--bg-inactive);
  transition: all 0.3s ease;
  cursor: pointer;
}

.dot.active {
  background-color: var(--primary-color);
  transform: scale(1.2);
  cursor: default;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
