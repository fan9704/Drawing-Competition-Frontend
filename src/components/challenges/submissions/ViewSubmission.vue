<template>
  <v-dialog v-model="isOpen" persistent max-width="900px">
    <v-card class="bg-grey-darken-3 text-white">
      <v-card-title class="text-h6">
        Submission {{ subData?.id }}
      </v-card-title>

      <v-card-text>
        <!-- 成功狀態的 Chip 標籤 -->
        <div v-if="subData?.statusEnum === 'success'" class="d-flex flex-wrap gap-2">
          <v-chip color="primary">
            <v-icon start>mdi-camera</v-icon>
            <span>吻合度 {{ subData?.fitness }}%</span>
          </v-chip>
          <v-chip color="primary">
            <v-icon start>mdi-code-braces</v-icon>
            <span>字數 {{ subData?.word_count }} 字</span>
          </v-chip>
          <v-chip color="primary">
            <v-icon start>mdi-clock-outline</v-icon>
            <span>執行時間 {{ subData?.execute_time }}</span>
          </v-chip>
          <v-chip color="primary">
            <v-icon start>mdi-pound</v-icon>
            <span>分數 {{ subData?.score }}</span>
          </v-chip>
        </div>

        <!-- 圖片預覽 -->
        <div v-if="subData?.statusEnum === 'success'">
          <h3 class="font-weight-bold text-h6 mt-4">圖片預覽</h3>
          <v-img :src="`${API_URL}${subData?.draw_image_url}`" alt="Problem Image" class="rounded-lg" width="720" />
        </div>

        <!-- 程式碼 -->
        <h3 class="font-weight-bold text-h6 mt-4">程式碼</h3>
        <v-card class="pa-3 bg-grey-darken-4 overflow-auto">
          <pre class="white--text">{{ subData?.code }}</pre>
        </v-card>

        <!-- 標準輸出 -->
        <h3 class="font-weight-bold text-h6 mt-4 d-flex align-center">
          標準輸出
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="18">mdi-information</v-icon>
            </template>
            STDOUT（標準輸出）用於輸出程式的主要資料或結果，例如 `print()` 產生的輸出。
          </v-tooltip>
        </h3>
        <v-card v-if="subData?.stdout.length" class="pa-3 bg-grey-darken-4 overflow-auto">
          <pre class="white--text">{{ subData?.stdout }}</pre>
        </v-card>
        <p v-else>無</p>

        <!-- 標準錯誤輸出 -->
        <h3 class="font-weight-bold text-h6 mt-4 d-flex align-center">
          標準錯誤輸出
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="18">mdi-alert-circle-outline</v-icon>
            </template>
            STDERR（標準錯誤）用於輸出錯誤或警告訊息，如果程式碼有報錯，內容將會顯示在這裡。
          </v-tooltip>
        </h3>
        <v-card v-if="subData?.stderr.length" class="pa-3 bg-grey-darken-4 overflow-auto">
          <pre class="white--text">{{ subData?.stderr }}</pre>
        </v-card>
        <p v-else>無</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onClose">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed } from "vue";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const isOpen = computed(() => props.subData !== null);

const props = defineProps({
  subData: {
    type: Object,
    default: null,
  },
  onClose: {
    type: Function,
    required: true,
  },
})
</script>

<style scoped>
/* 自定義樣式 */
</style>