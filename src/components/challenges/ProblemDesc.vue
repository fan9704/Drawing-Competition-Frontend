<template v-slot:default>
  <v-container class="pt-4">
    <v-card class="pa-6 rounded-lg" :class="'bg-opacity-70 ' + (challengeData ? 'bg-zinc-800' : 'bg-grey-800')">
      <v-row>
        <v-col cols="12">
          <v-row class="bg-blue-600 bg-opacity-60 pa-2 rounded-md" align="center">
            <v-icon class="white--text" small>mdi-book-open</v-icon>
            <h6 class="text-h6 text-zinc-100 font-weight-medium">題目描述</h6>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>{{ challengeData.description }}</h3>
          <v-img :src="imageUrl" alt="題目圖片" class="rounded-xl" @click="openImagePreview" height="400"
            aspect-ratio="1/1"></v-img>
        </v-col>
      </v-row>

      <v-dialog v-model="isOpen" max-width="720px">
        <v-card>
          <v-img :src="imageUrl" alt="Problem Image" class="rounded-xl"></v-img>
          <v-card-actions>
            <v-btn text="Close" @click="isOpen = false"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider class="my-4" />


      <v-row>
        <v-col>
          <v-btn v-bind="{}" :href="'/template.py'" download color="blue" rounded text="下載模板"></v-btn>
        </v-col>
        <v-col>
          <v-btn color="green" rounded @click="openFileInput" text="上傳程式"></v-btn>
          <input ref="fileInputRef" type="file" accept=".py" hidden @change="handleFileChange" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import ImagePreviewModal from "@/components/challenges/problem/ImagePreviewModal";
const props = defineProps({ id: String });
const fileInputRef = ref(null);
const userCode = ref("");
const challengeData = ref({});
const isOpen = ref(false);

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/challenge/${props.id}`);
    challengeData.value = await response.json() || {};
  } catch (error) {
    console.error("無法取得題目資料", error);
  }
});

const imageUrl = computed(() => {
  return challengeData.value?.image_url
    ? `${import.meta.env.VITE_BACKEND_URL}${challengeData.value.image_url}`
    : "";
});

const setIsOpen = (value) => {
  isOpen.value = value;
};
function openImagePreview() {
  isOpen.value = !isOpen.value
}

function openFileInput() {
  fileInputRef.value?.click();
}

function handleFileChange(event) {
  if (!event.target.files) return;
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (readerEvent) => {
    userCode.value = readerEvent.target.result;
    console.log("上傳的程式碼：", userCode.value);
  };
  event.target.value = "";
}
</script>
