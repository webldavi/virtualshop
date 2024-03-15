<template>
  <Dialog class="w-[30rem] h-max flex flex-col gap-4 justify-between" v-model:visible="model" modal
    header="Deletar produto" position="left">
    <p>Deseja realmente excluir esse produto?</p>
    <template #footer>
      <div class="w-full flex flex-row gap-4 justify-between">
        <Button label="Cancelar" severity="secondary" @click="model = false"/>
        <Button label="excluir" severity="danger" @click="submit"/>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
import Dialog from "primevue/dialog";
import { convertToBase64 } from "~/utils/helpers";
import { managerProduct } from '~/services/api'


const model = defineModel();
const emit = defineEmits(['submit'])
const props = defineProps(['product'])

function submit(){
  const token = managerToken.get()
  managerProduct.deleteUniqueProduct('token ' + token, props.product.id)
  emit('submit')
}

</script>
