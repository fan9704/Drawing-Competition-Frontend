<script setup lang="ts">
import { ref } from 'vue';
import { teamAuthWithToken, listTeam } from '@/api/team';
import type { Team, TeamAuthRequestDTO } from '@/interfaces/team';
import swal from 'sweetalert2';
import router from '@/router';
import { useTeamStore } from '@/store';


const form = ref(false);
const teamName = ref('');
const token = ref('');
const loading = ref(false);

const required = (v: string) => {
  return !!v || 'Field is required'
}

const onSubmit = async () => {
  const teamAuthRequestDTO: TeamAuthRequestDTO = {
    name: teamName.value,
    token: token.value,
  }

  if (!form.value) return

  loading.value = true
  const res = await teamAuthWithToken(teamAuthRequestDTO)
  setTimeout(() => (loading.value = false), 2000)
  if (res.status) {
    swal.fire("登入成功", `小組資料已經同步更新 歡迎小隊:${res.team.name}`, "success")
    const teamStore = useTeamStore();
    teamStore.$patch({
      teamData: res.team
    })
    router.push({ name: 'Index' });
  } else {
    swal.fire("登入失敗", "資料異常", "error")
  }

}
</script>
<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="teamName" :readonly="loading" :rules="[required]" class="mb-2" label="小隊名稱"
          clearable></v-text-field>

        <v-text-field v-model="token" :readonly="loading" :rules="[required]" label="通關密碼 Token"
          placeholder="Enter your token" clearable></v-text-field>

        <br>

        <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" variant="elevated" block>
          登入
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
