<script setup lang="js">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import * as mqtt from "mqtt/dist/mqtt.min";

// MQTT
const client = ref();
const connect = () => {
  const options = {
    username: 'guest',
    password: 'guest',
    port: 15675, // RabbitMQ Web MQTT port
  };

  let client = mqtt.connect('ws://127.0.0.1/ws', options);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
  });


  client.on('message', (topic, message) => {
    seriesList = [];
    roundList.value = message[0]["round_id_list"];
    message.forEach(record => {
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
    // @ts-ignore
    console.log(`Distance arrived: ${JSON.parse(message)}`);
  });

  client = client;
}
const subscribe = () => {
  const topic = '/statistic/round/allTeam/';
  // @ts-ignore
  client.subscribe(topic, (err) => {
    if (err) {
      console.log(`Failed to subscribe to ${topic}: ${err}`);
    } else {
      console.log(`Subscribed to ${topic}`);
    }
  });
}

// Chart
const allTeamScoreChart = ref(null);
let myAllTeamScoreChart = null;
const roundList = ref([]);
const teamList = ref([]);
let seriesList = [];


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

onMounted(() => {
  connect();
  subscribe();
  myAllTeamScoreChart = echarts.init(allTeamScoreChart.value);
  // getData()
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
    <div class="line-chart" ref="distanceChart"></div>
  </div>
</template>
