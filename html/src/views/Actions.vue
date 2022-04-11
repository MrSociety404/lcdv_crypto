<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { formatter, navigateBack } from '../utils';

import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';

import chevron from '../assets/svg/chevron-down.svg';
import warning from '../assets/svg/warning.svg';

// utility variables
const route = useRoute();
const store = useStore();

// Vuelidate
const states = ref({
  amount: null,
});
const rules = {
  amount: {
    required,
    numeric,
    minValue: minValue(0),
  },
};
const v$ = useVuelidate(rules, states);

const cryptos = computed(() => store.state.cryptos);
const wallet = computed(() => store.state.wallet);
const money = computed(() => store.state.money);
const isBuying = ref(true);
const invalideAmount = ref(false);

const currentCrypto = computed(() => {
  const id = route.params.name;
  return cryptos.value.find((c: any) => c.id === id);
});
const currentCryptoWalletAmount = () => {
  const id = route.params.name;
  const amout = wallet.value.find((c: any) => c.id === id);
  if (!amout) return 0;
  return amout.quantity;
};
const amountValue = computed(() => {
  if (v$.value.amount.$error) return 0;
  return currentCrypto.value.price * (v$.value.amount.$model || 0);
});

// Functions
const buyCrypto = () => {
  try {
    store.commit('addCryptoToWallet', {
      id: currentCrypto.value.id,
      quantity: parseInt(v$.value.amount.$model || '0'),
      price: amountValue.value,
    });
  } catch (err) {
    invalideAmount.value = true;
  }
};
const sellCrypto = () => {
  try {
    store.commit('sellCryptoToWallet', {
      id: currentCrypto.value.id,
      quantity: parseInt(v$.value.amount.$model || '0'),
      price: amountValue.value,
    });
  } catch (err) {
    console.log(err);
  }
};
const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;
  return isBuying.value ? buyCrypto() : sellCrypto();
};
</script>

<template lang="pug">
.w-500.mx-auto
  .bg-bgSecondary.w-full.rounded-full.transition-all
    button.text-white.text-center.rounded-full.py-2.px-4(
      :class='`${!isBuying ? "w-1/2" : "w-1/2 bg-primary"}`' 
      @click="isBuying = !isBuying"
    ) Acheter
    button.text-white.text-center.rounded-full.py-2.px-4(
      :class='`${isBuying ? "w-1/2" : "w-1/2 bg-primary"}`' 
      @click="isBuying = !isBuying"
    ) Vendre
  .text-center.flex.items-center.justify-center.gap-8.mt-6.mb-2
    h2 1 {{ currentCrypto.id }} = {{ formatter.format(currentCrypto.price) }}
    p.flex.items-center.justify-center.gap-2.text-alert
      | - 20,00 %
      chevron
  p.text-center.text-secondary.mb-1 {{ currentCryptoWalletAmount() }} {{ currentCrypto.id }} disponible
  p.text-center.text-secondary.mb-2 {{ money }} $ disponible
  div(v-show='isBuying')
    label.text-secondary.mb-2.block(for="amount") {{ isBuying ? 'Acquérir' : 'Revendre' }}
    .input
      input#amount.w-full.input-area(
        name="amount" 
        v-model='v$.amount.$model' 
        placeholder="1 000"
        @blur='v$.amount.$touch()'
        :class="`${v$.amount.$error ? 'input-error' : ''}`"
      ).
      .badge.badge-large
        .flex.gap-2.items-center
          img.small-icon(:src='currentCrypto.icon')
          | {{ currentCrypto.id }}
    p.text-alert.h-6.mb-2
      .flex.items-center.gap-4(v-if='v$.amount.$error')
        warning
        | Montant invalide, vérifier les informations
      .flex.items-center.gap-4(v-if='invalideAmount')
        warning
        | Montant invalide, montant invalide
  div(v-show='!isBuying')
    label.text-secondary.mb-2.block(for="amount") {{ isBuying ? 'Acquérir' : 'Revendre' }}
    .input
      input#amount.w-full.input-area(
        name="amount" 
        v-model='v$.amount.$model' 
        placeholder="1 000"
        @blur='v$.amount.$touch()'
        :class="`${v$.amount.$error ? 'input-error' : ''}`"
      ).
      .badge.badge-large
        .flex.gap-2.items-center
          img.small-icon(:src='currentCrypto.icon')
          | {{ currentCrypto.id }}
    p.text-alert.h-6.mb-2
      .flex.items-center.gap-4(v-if='v$.amount.$error')
        warning
        | Montant invalide, vérifier les informations
      .flex.items-center.gap-4(v-if='invalideAmount')
        warning
        | Montant invalide, montant invalide
  .mb-4
    label.text-secondary.mb-2.block(for="result") Valeur
    .input
      input#result.w-full.input-area(name="result" v-model='amountValue' placeholder="0" disabled).
      .badge.badge-large
        .flex.gap-2.items-center
          img.small-icon(src='../assets/img/usd.png')
          | USD
  .flex.items-center.justify-between.gap-6
    button.bg-bgSecondary.button.w-full.mx-auto(@click="navigateBack") Retour
    button.bg-primary.button.w-full.mx-auto(@click="onSubmit") Procéder
</template>

<style lang="scss"></style>
