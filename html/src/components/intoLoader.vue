<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const isLandingVue = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLandingVue.value = false;
  }, 2300);
});
</script>

<template lang="pug">
.landing.bg-screen(v-if='isLandingVue')
  img.landing-logo(src="../assets/img/lcdv.png", alt="logo")
</template>

<style lang="scss" scopped></style>
