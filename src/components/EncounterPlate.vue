<template>
  <!-- A band of open sky between two chapters, where one creature of this world shows itself. -->
  <section :id="`encounter-${creature}`" class="wrap encounter" :class="`encounter--${entry.side}`" :aria-label="`Bestiary: ${entry.name}`">
    <!-- the creature rides this box (scenes.js). Dragging it spins the creature: a pointer-only extra. -->
    <div
      ref="stageRef"
      class="encounter__stage"
      :class="{ 'is-playable': site.worldReady.value }"
      :data-stage="`encounter-${creature}`"
      aria-hidden="true"
    ></div>

    <div class="encounter__caption" data-reveal>
      <p class="label">Bestiary {{ entry.no }}</p>
      <p class="encounter__name">
        {{ entry.name }}
        <em class="encounter__role">{{ entry.role }}</em>
      </p>
      <p class="encounter__line">{{ entry.line }}</p>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'

import { bestiary } from '../content.js'

const props = defineProps({
  /** which creature: a key of `bestiary` in content.js and of the world's cast */
  creature: { type: String, required: true },
})

const site = inject('site')
const entry = bestiary[props.creature]
const stageRef = ref(null)
let unbindDrag = () => {}

const bind = () => {
  unbindDrag()
  unbindDrag = site.worldReady.value && stageRef.value ? site.bindDrag(stageRef.value, props.creature) : () => {}
}

watch(() => site.worldReady.value, bind)
onMounted(bind)
onUnmounted(() => unbindDrag())
</script>
