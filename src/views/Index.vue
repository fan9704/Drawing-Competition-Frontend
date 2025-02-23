<template>
  <v-container fluid class="index-container">
    <h1 id="index-title">
      Python <br />繪圖大挑戰
    </h1>
      <input v-model="teamCode" type="text" class="p-2 text-black rounded" style="  background-color: white;" placeholder="輸入團隊登入碼" />
      <span class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500" v-on:click="onSubmit"> 
        登入
      </span>
    <HelpButton />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { useCookies } from 'vue3-cookies';
import { toast } from 'sonner';
import HelpButton from '../components/shared/HelpButton';

// 定義反應式變數
const teamCode = ref('');
const { cookies } = useCookies();
const router = useRouter();
const isSubmitting = ref(false);

// 監視器 - 當組件加載時，檢查當前輪次狀態
onMounted(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/round/`)
    .then((res) => {
      if (res.status === 204) router.push('/results');
    });
});

// 驗證隊伍代碼
const checkTeamCodeMutation = useMutation({
  mutationFn: () =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/team/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: teamCode.value,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        if (!data.status) {
          throw new Error('Token is invalid');
        }
        return data;
      }),
  onSuccess: async (data) => {
    cookies.set('teamToken', data.access_token);
    router.push('/team');
  },
  onError: (error) => {
    if (error?.message === 'Token is invalid') {
      toast.error(`很抱歉，但我們找不到這個隊伍！`);
    } else {
      toast('未知的錯誤發生了！請尋找課活團隊求助', {
        description: error.message ?? error,
      });
    }
    console.error(error);
  },
  onMutate: () => {
    isSubmitting.value = true;
  },
  onSettled: () => {
    isSubmitting.value = false;
  },
});

// 提交表單
const onSubmit = () => {
  if (teamCode.value.length === 0) return;
  checkTeamCodeMutation.mutate();
};
</script>
<style scoped >
.index-container {
  background-color: black;
  height: 100vh;
  width: 100%;
  padding: 0px 20%;
  margin: auto;
  justify-content: center;
  align-content: center;
  color: white;
}

#index-title {
  font-size: 5rem;
  
}
</style>