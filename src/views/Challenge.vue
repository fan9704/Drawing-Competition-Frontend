<script setup>
import { onMounted } from "vue";
import ProblemDesc from "@/components/challenges/ProblemDesc.vue";
import Submissions from "@/components/challenges/Submissions.vue";

const props = defineProps({
  id: String
})


onMounted(() => {
  if (!props.id) {
    router.push("/404");
  }
});
</script>

<template>
  <!-- <div class="w-full h-full flex justify-center overflow-y-auto">
    <div class="w-full my-8 max-w-3xl flex flex-col gap-4"> -->
      <ProblemDesc :id="props.id || ''" />
      <Submissions :challengeId="props.id || ''" />
      <!-- <div class="h-40 w-full flex-shrink-0"></div>
    </div>
  </div> -->
</template>
