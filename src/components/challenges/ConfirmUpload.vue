<template>
    <v-dialog v-model="isOpen" persistent max-width="900px">
      <v-card class="bg-zinc-800 text-white">
        <v-card-title class="text-h6">確認提交程式</v-card-title>
  
        <v-card-text>
          <p>請在最後檢查一下您的程式</p>
          
          <!-- Vuetify 內建代碼區塊 -->
          <v-sheet class="whitespace-pre max-h-[400px] overflow-auto text-white bg-zinc-900 p-3">
            <pre>{{ code }}</pre>
          </v-sheet>
  
          <!-- 顯示錯誤訊息 -->
          <div v-for="(error, i) in errors" :key="i" class="w-full px-6 py-3 bg-red-300 rounded-md text-red-700 font-bold">
            {{ error }}
          </div>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="onClose">取消</v-btn>
          <v-btn color="success" :loading="isSubmitting" :disabled="errors.length > 0" @click="submitCode">
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

<script setup>
import { ref, watch } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'sonner';
import { useCookies } from 'vue3-cookies';
import { jwtDecode } from "jwt-decode";
import { drawingDefFuncCode } from '#/utils/templateTextConsts';

const props = defineProps({
    code: String,
    challengeId: String,
    isOpen: Boolean,
    onOpenChange:Function,
})

const { cookies } = useCookies();
const errors = ref([]);
const isSubmitting = ref(false);
const teamToken = cookies.get("teamToken");
const decodedToken = jwtDecode(teamToken);
const queryClient = useQueryClient();

watch(() => props.code, (newCode) => {
    const finalErrors = [];
    if (!newCode.includes(drawingDefFuncCode)) {
        finalErrors.push("沒有在你的程式碼中找到 drawing 函數的定義，你有使用模板嗎？");
    }
    errors.value = finalErrors;
}, { immediate: true });

// Mutation 用來提交程式碼
const submitCodeMutation = useMutation({
    mutationFn: () =>
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submission/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: props.code,
                team: parseInt(decodedToken?.sub ?? '0'),
                challenge: parseInt(props.challengeId),
            }),
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error(await res.text());
            }
            return res.json();
        }),
    onSettled: () => {
        queryClient.invalidateQueries({
            queryKey: ['submissions', props.challengeId, decodedToken?.sub],
            refetchType: 'all',
        });
        props.onOpenChange();
    },
    onSuccess: () => {
        toast.success('提交成功！');
        queryClient.setQueryData(
            ['submissions', props.challengeId, decodedToken?.sub],
            (oldData) => [
                {
                    id: uuidv4(),
                    code: props.code,
                    status: 'todo',
                    wordCount: '-',
                    fitness: '-',
                    execute_time: '-',
                    stdout: '',
                    stderr: '',
                    line_number: '-',
                    score: '-',
                    time: new Date().toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }),
                },
                ...oldData,
            ]
        );
    },

    onError: (error) => {
        toast.error('提交失敗，請再試一次！', {
            description: error.message ?? error,
        });
        console.error(error);
    },
});

// 提交程式碼
const submitCode = async () => {
    isSubmitting.value = true;
    await submitCodeMutation.mutateAsync();
    isSubmitting.value = false;
};
</script>

<style scoped>
/* 自定義樣式 */
</style>