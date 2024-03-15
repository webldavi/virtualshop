<template>
  <NuxtLayout name="navigation">
    <div class="w-full h-max flex flex-col gap-8 p-8">
      <h1>Todos os produtos</h1>
      <div class="w-full h-max flex flex-row gap-8 flex-wrap">
        <div v-for="product in productsStore.data" :key="product.id">
          <Card class="overflow-hidden w-[20rem] h-full" @click="selectProductToUpdate(product)">
            <template #header>
              <div class="h-max w-full overflow-hidden">
                <img alt="Imagem do produto" class="w-full max-h-[20rem] hover:scale-150" :src="product.imageUrl" />
              </div>
            </template>
            <template #title>
              <p class="break-words">{{ product.name }}</p>
            </template>
            <template #subtitle>{{ product.stock }} Em estoque</template>
            <template #content>
              <p class="m-0 limited-description">
                {{ product.description }}
              </p>
              <div></div>
            </template>
            <template #footer>
              <span class="text-2xl font-bold text-[#f59e0b]">{{ priceFormat(product.price) }}</span>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </NuxtLayout>

</template>
<script setup>
import { useProductsStore } from "~/store/products";
import { priceFormat } from "~/utils/helpers";
import Card from 'primevue/card';


const productsStore = useProductsStore()

definePageMeta({
  middleware: ['products']
})
</script>

<style scoped>
.p-card:hover {
  cursor: pointer;
  scale: 1.05;
}
</style>