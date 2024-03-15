<template>
  <Dialog class="w-[30rem] h-full flex flex-col gap-4 justify-between" v-model:visible="model" modal
    header="Atualizar produto" position="top">
    <div class="flex flex-col gap-4 flex-1">
      <img :src="product.imageUrl" class="w-full max-w-full rounded-lg"/>

      <InputGroup>
        <InputGroupAddon>
          <font-awesome-icon :icon="['fas', 'box']" />
        </InputGroupAddon>
        <InputText placeholder="Nome do produto" v-model="props.product.name"/>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon class="font-semibold"> R$ </InputGroupAddon>
        <InputNumber v-model="props.product.price" inputId="integeronly" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <font-awesome-icon :icon="['fas', 'boxes-stacked']" />
        </InputGroupAddon>
        <InputNumber placeholder="Quantidade em estoque" v-model="props.product.stock"/>
      </InputGroup>

      <Textarea v-model="props.product.description" class="min-w-full min-h-[10rem]" />

      <FileUpload class="min-w-full" mode="basic" name="demo[]" url="/api/upload" accept="image/*"
        :maxFileSize="1000000" @select="selectFile" choose-label="Escolher imagem do produto">
        <template #empty>
          dwdw
        </template>
      </FileUpload>
    </div>
    <Message v-if="alertMessage.visible" :closable="false" :severity="alertMessage.type">{{ alertMessage.content }}</Message>
    <template #footer>
      <div class="w-full flex flex-row gap-4 justify-between">
        <Button label="Cancelar" severity="secondary" @click="() => {
            emit('cancel')
            model = false
          }"/>
        <Button label="Excluir produto" severity="danger" @click="deleteProductDialog = true"/>
        <Button label="Salvar" severity="success" @click="submit"/>
      </div>
    </template>
  </Dialog>
  <DeleteProductDialog v-model="deleteProductDialog" :product="props.product" @submit="()=>{
    deleteProductDialog = false
    model = false
    emit('submit')
  }"/>
</template>
<script setup>
import Dialog from "primevue/dialog";
import DeleteProductDialog from './DeleteProductDialog.vue'
import { convertToBase64 } from "~/utils/helpers";
import { managerProduct } from '~/services/api'


const model = defineModel();
const emit = defineEmits(['submit', 'cancel'])
const props = defineProps(['product'])

const deleteProductDialog = ref(false)

const alertMessage = ref({
  visible: false, 
  content: '',
  type: ''
})


function selectFile(event) {
  convertToBase64(event.files[0], base64 => {
    const file = event.files[0]
    const fileType = file.name.split('.')[1]
    const url = `data:image/${fileType};base64,${base64}`
    props.product.imageUrl = url
  })
}

async function submit(){
  for(var item in props.product){
    const formItem = props.product[item]
    if(formItem == '' || formItem == 0){
      return dispatchMessage("Todos os campos devem ser preenchidos!", 'error')
    }
  }

  const token = managerToken.get()
  await managerProduct.updateProduct('token ' + token, props.product, props.product.id)
  model.value = false
  emit('submit')
}


function dispatchMessage(msg, type){
  alertMessage.value.content = msg
  alertMessage.value.type = type
  alertMessage.value.visible = true
  setTimeout(() => {
    alertMessage.value.visible = false
  }, 3000);
}

</script>
