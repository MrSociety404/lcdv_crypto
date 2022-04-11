<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { navigateTo, navigateBack } from '../utils';

import back from '../assets/svg/back.svg';
const store = useStore();

const cryptos = computed(() => store.state.cryptos);
</script>

<template lang="pug">
.px-9
  h1.font-semibold.text-2xl Acheter / Vendre des cryptomonnaies
  .flex.items-center.justify-center.gap-8.flex-wrap.mx-auto.my-6(class='w-9/12')
    .bg-bgSecondary.rounded-xl.card.text-center(
      v-for='(crypto, index) in cryptos' 
      :key='`card-${index}`'
      @click="navigateTo('actions', {name: crypto.id})"
    )
        img.mb-2(:src='crypto.icon')
        h3.text-xl.text-white {{ crypto.name }}
  button.bg-primary.button.mx-auto.mt-6(@click='navigateBack')
    back
    | Retour
</template>

<style lang="scss" scopped>
.card {
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
