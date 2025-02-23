<template>
    <AppShell>
      <div class="h-full w-full flex justify-center items-center">
        <div class="w-full max-w-4xl flex flex-col items-center justify-center">
          <img class="w-80" :src="SITCONLogo" alt="SITCON Logo" />
          <h2 class="mt-20 text-4xl font-semibold text-zinc-100 text-center">
            休息一下
          </h2>
          <p class="text-xl text-zinc-100 mt-6 leading-8 whitespace-pre text-center">
            {{ dadJoke }}
          </p>
        </div>
      </div>
    </AppShell>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  // import AppShell from "@/components/shared/AppShell";
  import SITCONLogo from "@/assets/SITCON_green.svg";
  import { DadJokes } from "@/utils/data";
  
  // 父組件中需要的狀態
  const dadJoke = ref("");
  
  // 在組件掛載時設定隨機笑話
  onMounted(() => {
    const randomIndex = Math.floor(Math.random() * DadJokes.length);
    dadJoke.value = DadJokes[randomIndex];
  });
  </script>
  