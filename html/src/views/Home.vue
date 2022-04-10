<script lang="ts" setup>
const solde = 1581154150;
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  useGrouping: true,
  minimumFractionDigits: 0,
});
</script>

<template lang="pug">
.px-9
  .flex.items-center.justify-between
    h2.font-semibold.text-2xl Votre solde
    h1.font-bold.text-4xl {{ formatter.format(solde) }}
  p.text-right.text-alert -2,50%
</template>

<style lang="scss"></style>
