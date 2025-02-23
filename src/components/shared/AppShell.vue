<script setup>
import Header from "@/components/shared/Header";

defineProps({
  allowAnon: Boolean
});
</script>

<template>
  <div class="fixed inset-0 bg-zinc-900 h-screen">
    <Header :allowAnon="allowAnon" />
    <div class="h-[calc(100vh-64px)]">
      <slot></slot>
    </div>
  </div>
</template>
