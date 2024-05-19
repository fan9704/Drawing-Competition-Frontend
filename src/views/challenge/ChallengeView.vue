<script setup lang="ts">
import Challenge from "@/components/challenge/index.vue"
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <Challenge :id=props.id />
</template>
<style></style>
