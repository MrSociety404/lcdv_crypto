<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import introLoader from './components/intoLoader.vue';
import logo from './assets/svg/logo.svg';
import moon from './assets/svg/moon.svg';
import sun from './assets/svg/sun.svg';
import { navigateTo } from './utils';

const store = useStore();
const isDark = ref(true);

const toggleDarkmode = () => {
  document.querySelector('html')?.classList.toggle('dark');
  isDark.value = !isDark.value;
};
onMounted(() => {
  window.addEventListener('message', (event: any) => {
    const data = event.data;
    if (data.type === 'startUI') {
      store.commit('initCrypto', data);
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      fetch('https://lcdv_crypto/escape', {
        method: 'POST',
      });
      navigateTo('home');
    }
  });
});
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
      router-view(v-slot='{ Component }')
        transition(name="scale" mode="out-in")
          component(:is='Component')
      introLoader
</template>

<style lang="scss" scopped></style>
