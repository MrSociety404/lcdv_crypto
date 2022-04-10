<script setup lang="ts">
import { ref } from 'vue';

import introLoader from './components/intoLoader.vue';
import logo from './assets/svg/logo.svg';
import moon from './assets/svg/moon.svg';
import sun from './assets/svg/sun.svg';

const isDark = ref(true);

const toggleDarkmode = () => {
  document.querySelector('html')?.classList.toggle('dark');
  isDark.value = !isDark.value;
};
</script>

<template lang="pug">
.view
  .screen.bg-screen
    .screen-container.h-full
      header.flex.items-center.justify-between.mb-10
        router-link(:to="{ name: 'home' }")
          logo
        moon.cursor-pointer(@click="toggleDarkmode" v-if='!isDark')
        sun.cursor-pointer(@click="toggleDarkmode" v-else)
      router-view
      //- introLoader
</template>

<style lang="scss" scopped></style>
