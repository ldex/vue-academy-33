<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import ProductService from './services/ProductService.js'

let products = ref([])
const errorMessage = ref(null)
const isLoading = ref(false)

isLoading.value = true
ProductService.getProducts()
    .then(data => products.value = data)
    .catch(error => {
      errorMessage.value = 'There was an error getting products from server, ' + error;
    })
    .finally(() => isLoading.value = false)
</script>

<template>
    <section v-if="errorMessage" class="errorMessage">
      {{errorMessage}}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <product-list v-else :products="products"></product-list>
    </section>
</template>

<style scoped>
</style>
