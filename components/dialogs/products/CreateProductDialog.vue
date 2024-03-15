<template>
  <Dialog class="w-[30rem] h-full flex flex-col gap-4 justify-between" v-model:visible="model" modal
    header="Adicionar produto" position="right">
    <div class="flex flex-col gap-4 flex-1">
      <InputGroup>
        <InputGroupAddon>
          <font-awesome-icon :icon="['fas', 'box']" />
        </InputGroupAddon>
        <InputText placeholder="Nome do produto" v-model="form.name"/>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon class="font-semibold"> R$ </InputGroupAddon>
        <InputNumber v-model="form.price" inputId="integeronly" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <font-awesome-icon :icon="['fas', 'boxes-stacked']" />
        </InputGroupAddon>
        <InputNumber placeholder="Quantidade em estoque" v-model="form.stock"/>
      </InputGroup>

      <Textarea v-model="form.description" class="min-w-full min-h-[10rem]" />

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
        <Button label="Cancelar" severity="secondary" @click="model = false"/>
        <Button label="Adicionar" severity="success" @click="submit"/>
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

const alertMessage = ref({
  visible: false, 
  content: '',
  type: ''
})

const form = ref({
  name: '',
  price: '',
  stock: '',
  description: '',
  imageUrl: ''
})

function selectFile(event) {
  convertToBase64(event.files[0], base64 => {
    const file = event.files[0]
    const fileType = file.name.split('.')[1]
    const url = `data:image/${fileType};base64,${base64}`
    form.value.imageUrl = url
  })
}

async function submit(){
  for(var item in form.value){
    const formItem = form.value[item]
    if(formItem == '' || formItem == 0){
      return dispatchMessage("Todos os campos devem ser preenchidos!", 'error')
    }
  }

  const token = managerToken.get()
  await managerProduct.createProduct('token ' + token, form.value)
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
