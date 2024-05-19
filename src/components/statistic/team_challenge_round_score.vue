<script setup lang="ts">
import type { StatisticTeamChallengeRoundScore } from "@/interfaces/statistic";
import { getStatisticTeamChallengeRoundScore } from "@/api/statistic";
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';


// Chart
const totalScoreChart = ref(null);
let myTotalScoreChart: any = null;
const chartData = ref<StatisticTeamChallengeRoundScore>({
  round_id: 0,
  team_id: 0,
  total_score: 0
});

const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);

const getData = async () => {
  let team_id: number | null = null;
  let round_id: number | null = null;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  const res = await getStatisticTeamChallengeRoundScore(team_id, 1);

  chartData.value = {
    round_id: res["round_id"],
    team_id: res["team_id"],
    total_score: res["total_score"]
  }
  updateChart();
}

const updateChart = () => {
  const option = {
    animationDuration: 3000,
    title: {
      text: `${teamData.value?.name}-第${chartData.value.round_id}回合總分`,
    },
    color: [
      "#A5D88D",
      "#77B55A",
      "#509231",
    ],
    gradientColor: [

    ],
    series: [{
      data: [{ value: chartData.value.total_score }],
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      min: 0,
      max: 2000,
      axisTick: {
        show: true
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10,
          borderColor: '#999'
        }
      },
    }]
  };
  myTotalScoreChart.setOption(option);
}
watch(chartData, (newValue, oldValue) => {
  updateChart();
  console.log('chartData changed', newValue);
})
onMounted(() => {
  myTotalScoreChart = echarts.init(totalScoreChart.value);
  getData();
})
onUnmounted(() => {
  if (myTotalScoreChart != null) {
    myTotalScoreChart.dispose();
    myTotalScoreChart = null;
  }
})
</script>
<template>
  <div class="line-chart-container">
    <div class="line-chart" ref="totalScoreChart"></div>
  </div>
  <!-- <v-btn @click="getData">Reload</v-btn> -->
</template>
