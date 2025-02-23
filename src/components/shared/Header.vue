<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from 'vue3-cookies';
import { getCurrentTime } from "@/utils/time";
import useLogout from "@/utils/auth";
import { useRoundQuery } from "@/utils/requests";
import HelpButton from "@/components/shared/HelpButton";

const props = defineProps({
  allowAnon: Boolean,
});

const router = useRouter();
const { cookies } = useCookies();
const teamToken = ref(cookies.get("teamToken"));
const { decodedToken } = jwtDecode(teamToken.value);
const logout = useLogout();

const roundRemainingTime = ref(null);
const roundDataQuery = useRoundQuery();

const updateRemainingTime = () => {
  if (!roundDataQuery.data.value) {
    roundRemainingTime.value = null;
    return;
  }

  const remainingTime = Math.floor(
    (new Date(roundDataQuery.data.value.end_time).getTime() -
      getCurrentTime().getTime()) /
    1000
  );

  roundRemainingTime.value = remainingTime;

  if (remainingTime <= 0) {
    router.push("/team");
  }
};

watch(roundDataQuery.data, updateRemainingTime);

let timer;
onMounted(() => {
  updateRemainingTime();
  timer = setInterval(updateRemainingTime, 1000);

  if (!props.allowAnon) {
    if (!teamToken.value || !decodedToken) {
      logout();
    }
  }
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <header class="bg-zinc-900 h-16 border-b border-b-zinc-400 text-white px-14 flex justify-between items-center">
    <div class="flex gap-4">
      <RouterLink :to="allowAnon ? '/' : '/team'">
        <h1 class="text-xl font-bold">Python 繪圖大挑戰</h1>
      </RouterLink>
    </div>

    <div class="flex gap-4 items-center justify-end">
      <div v-if="roundRemainingTime !== null"
        class="px-3 py-1.5 text-white rounded-md font-bold flex gap-1 items-center" :class="{
          'bg-green-600': roundRemainingTime > 900,
          'bg-yellow-600': roundRemainingTime > 300,
          'bg-red-600': roundRemainingTime <= 300,
        }">
        <ClockIcon class="w-5 text-white" />
        <p>
          {{ Math.max(Math.floor(roundRemainingTime / 60), 0).toString().padStart(2, "0") }}:
          {{ Math.max(roundRemainingTime % 60, 0).toString().padStart(2, "0") }}
        </p>
      </div>

      <div v-if="decodedToken">
        <button class="px-3 py-1.5 border border-zinc-500 text-white rounded-md flex gap-2 items-center">
          {{ decodedToken.name }}
          <ChevronDownIcon class="w-4" />
        </button>
        <ul class="absolute bg-zinc-800 text-white rounded-md mt-2">
          <li class="px-4 py-2 cursor-pointer hover:bg-zinc-700" @click="router.push('/team')">
            回到團隊頁
          </li>
          <li class="px-4 py-2 cursor-pointer hover:bg-zinc-700" @click="logout">登出</li>
        </ul>
      </div>
    </div>
    <HelpButton />
  </header>
</template>
