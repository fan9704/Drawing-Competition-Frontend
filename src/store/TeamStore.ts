import type { Team } from '@/interfaces/team';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export default defineStore('team', () => {
  const teamData: Ref<Team | undefined> = ref();

  function getTeamData() {
    return teamData.value;
  }
  return { teamData, getTeamData }
});
