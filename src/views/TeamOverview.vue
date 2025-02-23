<template>
  <div >
    <div v-if="!noRound" >

      <h1 class="text-white">
        {{ decodedToken?.name }}的闖關者們，歡迎！
        <br>
        現在回合：第 {{ roundDataQuery.data.value?.id }} 回合
      </h1>
      <div class="mt-4">
        <v-tabs v-model="tab" align-tabs="center">
          <v-tab value="challenge" text="挑戰"></v-tab>
          <v-tab value="leaderboard" text="排行榜"></v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="challenge">
            <h3 class="text-white">挑戰題目</h3>
              <!-- <v-card class="mx-auto" style="background-color: black;"> -->
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" xs="8" sm="6" md="6" lg=6 xl="4" v-if="roundDataQuery.data.value?.challenge_list" v-for="card in roundDataQuery.data.value?.challenge_list">
                      <ChallengeCard :key="card.id" :card="card" />
                    </v-col>
                  </v-row>
                </v-container>
              <!-- </v-card> -->
            <!-- </v-tab> -->
          </v-tabs-window-item>
          
          <v-tabs-window-item value="leaderboard">
              <h3 class="text-white">排行榜</h3>
              <TeamLeaderboard :roundId="roundDataQuery.data.value?.id" />
          </v-tabs-window-item >
          
        </v-tabs-window>
      </div>
      <div class="h-40 w-full flex-shrink-0" />
    </div>

    <Intermission v-else />
  </div>
</template>

<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted, watch,defineAsyncComponent } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRoundQuery } from '@/utils/requests';
import ChallengeCard from '@/components/challenges/ChallengeCard';
import Intermission from '@/components/challenges/teamview/Intermission';

const tab = ref("challenge");
const { cookies } = useCookies();
const decodedToken  = jwtDecode(cookies.get("teamToken"));
const roundDataQuery = useRoundQuery();
const noRound = ref(false);
const TeamLeaderboard = defineAsyncComponent(() =>
  import("@/components/challenges/teamview/Leaderboard.vue")
);
watch(() => roundDataQuery.isPending, (isPending) => {
  if (!isPending) {
    noRound.value = roundDataQuery.data === null;
  }
});

onMounted(() => {
  if (roundDataQuery.isPending) return;
  noRound.value = roundDataQuery.data === null;
});
</script>
<style scoped></style>
