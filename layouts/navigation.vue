<template>
  <main class="w-full min-h-screen flex flex-col gap-8 ">
    <nav class="w-full bg-[#f59e0b] p-4 h-max">
      <h1 class="text-4xl font-extrabold h-max m-0 text-white">
        {{ config.brandName }}
      </h1>
    </nav>
    <slot/>
  </main>
</template>

<script setup>
const config = useRuntimeConfig().public
</script>