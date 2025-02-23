<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const props = defineProps({
  card: Object, // ChallengeType
});

const router = useRouter();

const difficultyText = computed(() => {
  switch (props.card.difficulty) {
    case "easy":
      return "簡單";
    case "medium":
      return "中等";
    case "hard":
      return "困難";
    default:
      return "未知";
  }
});
// 動態設定顏色
const difficultyClass = computed(() => {
  switch (props.card.difficulty) {
    case "easy":
      return "bg-green-500 text-black";
    case "medium":
      return "bg-yellow-500 text-black";
    case "hard":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white"; // 預設顏色
  }
});
</script>

<template>
    <v-card
    class="challenge-card pa-4"
    color="#5547477a"
    @click="router.push(`/challenge/${card.id}`)"
  >
    <v-img
      class="align-end text-black challenge-card-image"
      :src="`${API_URL}${card.image_url}`"
      alt="Card background"
    >
      <v-card-title>{{ card.title }}</v-card-title>
    </v-img>
    <v-card-actions color="white">
      <v-chip :class="difficultyClass">
      {{ difficultyText }}
    </v-chip>
    {{ card.description }}
      
    </v-card-actions>
  </v-card>
</template>
<style>
.bg-green-500 {
  background-color: #22c55e; /* 綠色 */
}

.bg-yellow-500 {
  background-color: #f5e837; /* 黃色 */
}

.bg-red-500 {
  background-color: #ef4444; /* 紅色 */
}

.bg-gray-500 {
  background-color: #6b7280; /* 預設灰色 */
}

.text-white {
  color: white;
}

.text-black {
  color: black;
}

.challenge-card{
  margin: 5px;
  padding: 20px 5px;
  border-radius: 10px;
  color: white;
}
.challenge-card-image{
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
}
.card-text{
  color: white;
}
</style>