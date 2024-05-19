<script setup lang="ts">
import TeamChallengeHighestFitness from "@/components/statistic/team_challenge_highest_fitness.vue";
import TeamChallengeSubmissionCount from "@/components/statistic/team_challenge_submission_count.vue";
import TeamChallengeRoundScore from "@/components/statistic/team_challenge_round_score.vue";
import AllTeamRoundScore from "@/components/statistic/all_team_round_score.vue";
import { listTeam } from '@/api/team';
import type { TeamListResponseDTO, Team } from '@/interfaces/team';
import { ref, watch } from 'vue';

import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onMounted } from "vue";

const teamList = ref<TeamListResponseDTO[]>([]);
const selectedTeam = ref();
const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);
const render = ref(true);

const getAllTeam = async () => {
  const res = await listTeam();
  res.push({

    id: undefined,
    name: "所有隊伍"
  });
  teamList.value = res;
}


const teamItemProps = (item: TeamListResponseDTO) => ({
  title: item.name,
  value: item,
  text: item.name
});
watch(selectedTeam, () => {
  let teamTemp: Team | undefined;
  if (selectedTeam.value !== null) {
    teamTemp = {
      id: selectedTeam.value.id,
      name: selectedTeam.value.name,
      token: ""
    };
  }
  teamStore.$patch({
    teamData: teamTemp
  })
  render.value = false;
  setTimeout(() => {
    render.value = true;
  }, 500);

})

onMounted(() => {
  getAllTeam();
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2>{{ teamData?.name }}</h2>
      </v-col>
      <v-col cols="6">
        <v-select label="Select Team" v-model="selectedTeam" :item-props="teamItemProps" :items=teamList>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4" v-if="render">
        <TeamChallengeHighestFitness />
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4" v-if="render">
        <TeamChallengeSubmissionCount />
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4" v-if="render">
        <TeamChallengeRoundScore />
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4" v-if="render">
        <AllTeamRoundScore />
      </v-col>
    </v-row>

  </v-container>
</template>
<style></style>
