<template>
  <div>Table</div>
  <Customer />

</template>

<script setup>
import Customer from '@/components/Customer.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
