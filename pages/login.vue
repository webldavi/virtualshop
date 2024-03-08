<template>
  <main class="mainContainer">
    <Panel header="Fazer Login como administrador">
      <div class="formSection">
        <InputGroup>
          <InputGroupAddon>
            <font-awesome-icon :icon="['fas', 'user']" />
          </InputGroupAddon>

          <InputText placeholder="Seu email" type="email" v-model="form.email"/>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <font-awesome-icon :icon="['fas', 'key']" />
          </InputGroupAddon>

          <Password placeholder="Sua senha" :feedback="false" toggle-mask v-model="form.password"/>
        </InputGroup>
      </div>

      <Message v-if="alertMessage.visible" :closable="false" :severity="alertMessage.type">{{ alertMessage.content }}</Message>

      <Button label="Fazer Login" class="w-full" @click="submit"/>
    </Panel>
  </main>
</template>

<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Checkbox from 'primevue/checkbox';
import Panel from "primevue/panel";
import Button from 'primevue/button';
import Password from 'primevue/password';
import Message from 'primevue/message';

import { managerUser } from "~/services/api/index";

const config = useRuntimeConfig();
const form = ref({
  email: '',
  password: '',
})
const alertMessage = ref({
  visible: false, 
  content: '',
  type: ''
})


function dispatchMessage(msg, type){
  alertMessage.value.content = msg
  alertMessage.value.type = type
  alertMessage.value.visible = true
  setTimeout(() => {
    alertMessage.value.visible = false
  }, 3000);
}

async function submit(){
  const authenticatedUserToken = await managerUser.login(form.value)
  if("errors" in authenticatedUserToken){
    return dispatchMessage(authenticatedUserToken.errors[0], 'error')
  }
  managerToken.set(authenticatedUserToken.token)
  dispatchMessage('Você se logou com sucesso', 'success')
  navigateTo("/dashboard")
}
</script>


<style scoped>
.mainContainer {
  @apply w-full min-h-screen flex items-center justify-center p-4;
}

.formSection{
  @apply flex flex-col gap-2 my-2 mb-8
}
.space-x-2{
  @apply flex flex-row gap-2 items-center my-4
}
</style>