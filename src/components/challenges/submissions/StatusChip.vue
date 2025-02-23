<script setup>
import { computed } from "vue";

const props = defineProps({
  status: String,
});

const chipColor = computed(() => {
  switch (props.status) {
    case "success":
      return "green";
    case "fail":
      return "red";
    case "doing":
      return "yellow";
    default:
      return "gray";
  }
});

const chipText = computed(() => {
  switch (props.status) {
    case "success":
      return "成功";
    case "fail":
      return "失敗";
    case "doing":
      return "執行中";
    default:
      return "等待執行中";
  }
});
</script>

<template>
    <v-chip :color="chipColor" variant="flat">
        {{ chipText }}
    </v-chip>
</template>