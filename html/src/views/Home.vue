<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { formatter } from '../utils';

import wallet from '../assets/svg/wallet.svg';
import exchange from '../assets/svg/exchange.svg';
import chevron from '../assets/svg/chevron-down.svg';

const router = useRouter();
const store = useStore();

const totalValue = computed(() => store.getters.totalWalletValue);
const cryptos = computed(() => store.state.cryptos);

const navigateTo = (path: string, option?: any) => {
  if (option) {
    return router.push({ name: path, params: option });
  }
  router.push({ name: path });
};
</script>

<template lang="pug">
.px-9
  .flex.items-center.justify-between
    h2.font-semibold.text-2xl Votre solde
    h1.font-bold.text-4xl {{ formatter.format(totalValue) }}
  p.text-right.text-alert -2,50%
  .flex.items-center.gap-4.mb-6
    button.bg-primary.button(@click='navigateTo("wallet")')
      wallet
      | Portefeuille
    button.bg-bgSecondary.button(@click='navigateTo("navigation")')
      exchange
      | Trade
  h2.font-semibold.text-2xl.mb-4 Top cryptomonnaies
  .text-secondary.text-sm.mb-3
    .flex.items-center
      p(class='w-1/12') Rank
      p.flex-1 Nom
      p.text-right(class='w-2/12') Prix
      p.text-right(class='w-2/12') 5min %
      p.text-right(class='w-2/12') Action
  .mb-4(v-for='(crypto, index) in cryptos' :key='`crypto-${index}`')
    .flex.items-center
      p.text-secondary(class='w-1/12') # {{ index + 1 }}
      p.flex-1.flex.gap-8.items-center
        img.small-icon(:src='crypto.icon')
        span {{ crypto.id }}
        span {{ crypto.name }}
      p.text-right(class='w-2/12') {{ formatter.format(crypto.price) }}
      p.text-right.text-alert.flex.gap-2.items-center.justify-end(class='w-2/12')
        | - 0,5 %
        chevron
      p.text-right(class='w-2/12' @click='navigateTo("actions", { name: crypto.id })')
        .badge Acheter
</template>

<style lang="scss"></style>
