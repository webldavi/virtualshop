<template>
  <div class="sidebarContainer">
    <div class="sidebar">
      <div class="flex flex-col opacity-70">
        <span class="text-xl font-bold">{{
          userStore.me.name || "Leandro"
        }}</span>
        <span class="text-lg font-medium">{{ userStore.me.email }}</span>
      </div>

      <div class="flex flex-col gap-2 w-full flex-1 my-4">
        <template v-for="link in links" :key="link">
          <Button
            class="w-full my-2"
            :severity="route.name == link.route ? 'secondary' : ''"
            @click="navigateTo(router.resolve({name: link.route}).fullPath)"
          >
            <div class="space-x-2 text-lg">
              <font-awesome-icon :icon="link.icon" />
              <span>{{ link.name }}</span>
            </div>
          </Button>
        </template>
      </div>

      
      <Button severity="danger" class="w-full" @click="userStore.logout">
        <div class="space-x-2">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span>sair</span>
        </div>
      </Button>
    </div>
    
    <div class="pageView">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const route = useRoute()
const router = useRouter()
const links = ref([
  {
    name: "Produtos",
    icon: ["fas", "boxes-stacked"],
    route: 'dashboard',
  },
  {
    name: "Configurações",
    icon: ['fas', 'gear'],
    route: 'configurations',
  },
]);


</script>

<style>
.sidebarContainer {
  @apply min-w-full flex flex-row gap-2 text-white;
}

.sidebar {
  border-right: 2px solid #dcdcdc;
  @apply min-h-full flex flex-col gap-4 items-center justify-between p-4 bg-[#f59e0b];
}

.sidebarContainer .pageView {
  @apply min-h-screen w-full;
}
</style>