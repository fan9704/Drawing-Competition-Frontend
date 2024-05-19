<script setup lang="ts">
import type DrawerMenuItem from '@/interfaces/DrawerMenuItemInterface';

/** Drawer menu items */
const items: DrawerMenuItem[] = [
  {
    title: '首頁',
    icon: 'mdi-home',
    to: { name: 'Index' },
  },
  {
    title: '-', // Divider
  },
  // Challenge
  {
    title: '挑戰列管',
    icon: 'mdi-camera-timer',
    to: { name: 'Challenge' },
  },
  // Team
  {
    title: '小隊登入',
    icon: 'mdi-account',
    to: { name: 'TeamAuth' },
  },
  // Statistic
  {
    title: '圖表統計',
    icon: 'mdi-chart-bar',
    to: { name: 'Statistic' },
  },
  {
    title: '及時統計',
    icon: 'mdi-chart-bar',
    to: { name: 'Realtime-Statistic' },
  },
];
</script>

<template>
  <v-list nav>
    <template v-for="item in items" :key="item.title">
      <v-divider v-if="item.title === '-'" />
      <template v-else>
        <!-- Menu Item -->
        <v-list-item v-if="!item.items" :disabled="!item.to" :prepend-icon="item.icon" :title="item.title" :to="item.to"
          link />
        <!-- Sub menu -->
        <v-list-group v-else-if="item.items" v-model="item.active">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" />
          </template>
          <!-- Sub menu item -->
          <template v-for="subItem in item.items" :key="subItem.title">
            <v-divider v-if="subItem.title === '-'" />
            <v-list-item v-else :disabled="!subItem.to" :prepend-icon="subItem.icon" :title="subItem.title"
              :to="subItem.to" link />
          </template>
        </v-list-group>
      </template>
    </template>
  </v-list>
</template>
