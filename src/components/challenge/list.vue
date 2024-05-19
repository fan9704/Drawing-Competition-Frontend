<script setup lang="ts">
import { listChallenge,listTeamChallenge } from '@/api/challenge';
import { ref,onMounted } from "vue";
import router from '@/router';
import type { Challenge,TeamChallenge } from '@/interfaces/challenge';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';

const challenges = ref<Challenge[]>([]);
const teamChallenges = ref<TeamChallenge[]>([]);
const selectKey = ref<String|null>("");
const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);

const gotoChallenge = (id: number) => {
  router.push({ path: `/challenge/${id}` })
}
const findAllTeamChallenge = async () => {
  let team_id: number = 0;
  if (teamData.value) {
    team_id = teamData.value.id;

  }
  const res = await listTeamChallenge(team_id);
  teamChallenges.value = res;
}
const selectStatus = (key: string) => {
  selectKey.value = key
}
interface StateList {
  [key: string]: string;
}
const stateList: StateList = {
  "success": "✅",
  "todo": "🔷",
  "doing": "🔶",
  "failed": "❌",
}
const getChallengeStatusIcon = (state: string) => {
  return stateList[state]
}

onMounted(() => {
  findAllTeamChallenge();
});

function computed(arg0: () => { id: number; round_id: number; description: string; is_valid: boolean; status: string; }[]) {
  throw new Error('Function not implemented.');
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-chip @click="selectKey = ''">✔️ all</v-chip>
        <v-chip v-for="key in Object.keys(stateList)" @click="selectStatus(key)">
          {{ getChallengeStatusIcon(key) }}-{{ key }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">題目編號</v-col>
      <v-col cols="4">簡短描述</v-col>
      <v-col cols="4">開放回合</v-col>
    </v-row>
    <v-row v-for="(challenge, index) in teamChallenges">
      <v-col cols="4" v-if="selectKey === '' || selectKey == challenge.status">{{
          getChallengeStatusIcon(challenge.status) }}-{{
          challenge.id }}</v-col>
      <v-col cols="4" v-if="selectKey === '' || selectKey == challenge.status" class="ellipsis"
        @click="gotoChallenge(challenge.id)" style="text-decoration: underline;">{{ challenge.description }}</v-col>
      <v-col cols="4" v-if="selectKey === '' || selectKey == challenge.status">{{ challenge.round_id }}</v-col>
    </v-row>
  </v-container>
</template>
<style>
.ellipsis {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
