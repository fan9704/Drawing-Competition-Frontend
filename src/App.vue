<template>
  <v-app>
    <v-layout style="background-color: black;">
      <!-- 固定在頂部的 App Bar -->
      <v-app-bar color="black" fixed elevation="4">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        </template>
        <router-link :to="true ? '/' : '/team'" style="text-decoration: none; color: white;">
          <v-app-bar-title>Python 繪圖大挑戰</v-app-bar-title>
        </router-link>
        <template v-slot:append>
          <v-chip variant="outlined" color="success" prepend-icon="mdi-clock">time</v-chip>
          <v-btn icon="mdi-github"></v-btn>
        </template>
        <!-- 修正 Router Link -->

      </v-app-bar>
      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list nav>
          <v-list-item prepend-icon="mdi-group" title="Team" value="team" to="/team"></v-list-item>
          <v-list-item prepend-icon="mdi-contrast" title="Toggle Theme" value="toggle-theme" @click="toggleTheme"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- 主要內容區域 -->
      <!-- class="d-flex justify-center" -->
      <v-main>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="8" xs="12" sm="12" md="8" lg="6" xl="6">
              <router-view v-slot="{ Component, route }">
                <component :is="Component" :key="route.name" />
              </router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { jwtDecode } from "jwt-decode";
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify'
import { useCookies } from 'vue3-cookies';

const drawer = ref(false);
const { cookies } = useCookies();
const theme = useTheme()
const decodedToken  = jwtDecode(cookies.get("teamToken"));
function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// onMounted(()=>{
//   if(decodedToken !== undefined){
//     const remainingTime = Math.floor(
//             (new Date(roundDataQuery.data.end_time).getTime() -
//                 getCurrentTime().getTime()) /
//                 1000,
//         );
//         setRoundRemainingTime(remainingTime)
//   }
// })
</script>

<style scoped>
/* #content {
  padding: 64px 0px
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
