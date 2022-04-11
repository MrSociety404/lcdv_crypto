<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatter, navigateBack } from '../utils';

import chevron from '../assets/svg/chevron-down.svg';
import back from '../assets/svg/back.svg';

const store = useStore();

const totalValue = computed(() => store.getters.totalWalletValue);
const cryptos = computed(() => store.state.cryptos);
const wallet = computed(() => store.state.wallet);

const getCrytoAmout = (id: number) => {
  const walletCrypto = wallet.value.find((c: any) => c.id === id);
  if (!walletCrypto) return 0;
  return walletCrypto.quantity;
};
const getCrytoValue = (id: number) => {
  const amount = getCrytoAmout(id);
  const localCrypto = cryptos.value.find((c: any) => c.id === id);
  return formatter.format(amount * localCrypto.price);
};
</script>

<template lang="pug">
.px-9
  .flex.items-center.justify-between
    h2.font-semibold.text-2xl Votre solde
    h1.font-bold.text-4xl {{ formatter.format(totalValue) }}
  p.text-right.text-alert.mb-4 -2,50%
  h2.font-semibold.text-2xl.mb-4 Top cryptomonnaies
  .text-secondary.text-sm.mb-3
    .flex.items-center
      p.flex-1 Nom
      p.text-right(class='w-2/12') Prix
      p.text-right(class='w-2/12') 5min %
      p.text-right(class='w-2/12') Titres
      p.text-right(class='w-2/12') Valeur
  .mb-4(v-for='(crypto, index) in cryptos' :key='`crypto-${index}`')
    .flex.items-center
      p.flex-1.flex.gap-8.items-center
        img.small-icon(:src='crypto.icon')
        span {{ crypto.id }}
        span {{ crypto.name }}
      p.text-right(class='w-2/12') {{ formatter.format(crypto.price) }}
      p.text-right.text-alert.flex.gap-2.items-center.justify-end(class='w-2/12')
        | - 0,5 %
        chevron
      p.text-right(class='w-2/12') {{ getCrytoAmout(crypto.id) }}
      p.text-right(class='w-2/12') {{ getCrytoValue(crypto.id) }}
  button.bg-primary.button.mx-auto.mt-6(@click='navigateBack')
    back
    | Retour
</template>

<style lang="scss" scopped></style>
