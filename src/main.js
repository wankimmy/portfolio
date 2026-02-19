/**
 * Application Entry Point
 * 
 * Initializes the Vue 3 application and registers global plugins.
 * GSAP ScrollTrigger is registered for scroll-based animations.
 * 
 * @file main.js
 */

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Register GSAP plugins for scroll animations
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Create and mount the Vue application
createApp(App).mount('#app')
