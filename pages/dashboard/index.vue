<template>
  <NuxtLayout name="sidebar">
    <main class="w-full min-h-screen flex flex-col gap-8 p-8 text-[#444]">
      <section class="w-full flex flex-row gap-w items-center justify-between">
        <h1 class="font-bold text-4xl">Seus Produtos</h1>

        <InputGroup class="max-w-[30rem]">
          <InputGroupAddon>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </InputGroupAddon>
          <InputText placeholder="Nome de um produto" v-model="searchContent" />
        </InputGroup>

        <Button @click="dialogs.create = true">
          <div class="space-x-2">
            <font-awesome-icon :icon="['fas', 'plus']" />
            <span class="text-xl font-medium">Adicionar Produto</span>
          </div>
        </Button>
      </section>

      <section class="flex flex-row flex-wrap gap-8 justify-between relative">
        <div v-for="product in getProductListByFilter()" :key="product.id" class="relative">
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
              <span class="text-2xl font-bold">{{
                priceFormat(product.price)
              }}</span>
            </template>
          </Card>
        </div>
      </section>

      <CreateProductDialog v-model="dialogs.create" @submit="()=> productsStore.getAllProducts()"/>
      <UpdateProductDialog v-model="dialogs.update" :product="currentValues.product" @cancel="()=> productsStore.getAllProducts()" @submit="()=> productsStore.getAllProducts()"/>
    </main>
  </NuxtLayout>
</template>

<script setup>
import { useProductsStore } from "~/store/products";
import { priceFormat } from "~/utils/helpers";

import CreateProductDialog from '~/components/dialogs/products/CreateProductDialog.vue'
import UpdateProductDialog from "~/components/dialogs/products/UpdateProductDialog.vue";

const searchContent = ref("");
const productsStore = useProductsStore();

const dialogs = ref({
  create: false,
  update: false
})

const currentValues = ref({
  product: {}
})

function getProductListByFilter() {
  return productsStore.data.filter((product) => {
    return String(product.name.toLowerCase()).startsWith(
      searchContent.value.toLowerCase()
    );
  });
}

function selectProductToUpdate(product){
  currentValues.value.product = product
  dialogs.value.update = true
}
definePageMeta({
  middleware: ["auth", "me", "products"],
});
</script>

<style scoped>
.p-card:hover{
  cursor: pointer;
  scale: 1.05;
}
</style>