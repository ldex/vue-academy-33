<template>
    <section v-if="errorMessage">
        {{ errorMessage }}
    </section>
    <section v-else>
        <div v-if="isLoading">
            <div class="loader">Loading products...</div>
        </div>
        <div v-else>
            <product-list :products="products" :page-size="5">
                <template v-slot="sp">
                    <span>{{ sp.product.name }}</span> <span>({{ sp.product.price }}$)</span>
                </template>
            </product-list>
        </div>
    </section>
</template>

<script setup>
import { computed, onErrorCaptured } from 'vue'
import ProductList from '@/components/ProductList.vue';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);

productStore.fetchProducts()

onErrorCaptured((error) => {
    console.error('Error in component: ', error.message);
    return true;
});
</script>

<style lang="css" scoped></style>