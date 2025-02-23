<script setup>
import { ref } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  imageUrl: String,
});

const isActive = ref(props.isOpen);
const emit = defineEmits(["update:isOpen"]);
const closeModal = () => {
  emit("update:isOpen", false);
  props.isOpen = false;
  console.log("關閉")
  isActive.value = false
};
</script>

<template>
  <v-dialog v-model="isActive" max-width="720px">
      <v-card>
        <v-img :src="props.imageUrl" alt="Problem Image" class="rounded-xl"></v-img>
        <v-card-actions>
          <v-btn text="Close" @click="closeModal"></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
