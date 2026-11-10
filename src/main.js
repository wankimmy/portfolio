import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import App from './App.vue'
import './style.css'
import './styles/graph-chat.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

createApp(App).mount('#app')
