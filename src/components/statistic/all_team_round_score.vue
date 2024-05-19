<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { getAllStatisticTeamRoundScore } from "@/api/statistic";
import type { StatisticTeamRoundTotalScore } from "@/interfaces/statistic";

// Chart
const allTeamScoreChart = ref(null);
let myAllTeamScoreChart: any = null;
const roundList = ref<number[]>([]);
const teamList = ref<string[]>([]);
let seriesList: echarts.SeriesOption[] = [];


const getData = async () => {
  seriesList = [];
  const res = await getAllStatisticTeamRoundScore();
  roundList.value = res[0]["round_id_list"];
  res.forEach(record => {
    teamList.value.push(record["team_name"]);
    seriesList.push({
      type: 'line',
      name: record["team_name"],
      emphasis: {
        focus: 'series'
      },
      data: record["total_score_list"]
    })
  });

  updateChart();
}

const updateChart = () => {
  const option = {
    animationDuration: 3000,
    title: {
      text: '各小隊各回合總分',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 300
    },
    legend: {
      right: 10,
      orient: 'vertical',
      data: teamList.value
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      // data: roundList.value
    }],
    yAxis: [{
      type: 'value'
    }],
    grid: {
      left: '5%',
      right: '5%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    series: seriesList
  };
  myAllTeamScoreChart.setOption(option);
}

// watch(chartData, (newValue, oldValue) => {
//   updateChart();
//   console.log('chartData changed', newValue);
// })

onMounted(() => {
  myAllTeamScoreChart = echarts.init(allTeamScoreChart.value);
  getData()
})

onUnmounted(() => {
  if (myAllTeamScoreChart != null) {
    myAllTeamScoreChart.dispose();
    myAllTeamScoreChart = null;
  }
});

</script>
<template>
  <div class="line-chart-container">
    <div class="line-chart" ref="allTeamScoreChart"></div>
  </div>
</template>
