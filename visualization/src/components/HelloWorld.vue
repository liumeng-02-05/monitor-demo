<template>
  <div >
  <div class="te">
      <div id="myChart" :style="{ width: '450px', height: '300px' }"></div>
      <div id="myChart1" :style="{ width: '450px', height: '300px' }"></div>
      <div id="myChart2" :style="{ width: '450px', height: '300px' }"></div>
  </div>
  <div class="table">
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
        <el-table-column prop="id" label="id"/>
        <el-table-column prop="buriedpoina" label="buriedpoina"  />
        <el-table-column prop="buriedpoinb" label="buriedpoinb" />
        <!-- <el-table-column prop="buriedpoinc" label="buriedpoinc"  />
        <el-table-column prop="buriedpoind" label="buriedpoind" />
        <el-table-column prop="buriedpoine" label="buriedpoine"  /> -->
        <el-table-column prop="custom" label="custom" />
        <el-table-column prop="event_type" label="event_type"  />
        <el-table-column prop="local_time" label="local_time" />
        <el-table-column prop="server_time" label="server_time" />
      </el-table>
      <el-pagination class="pagination" @current-change="current_change"  background page-sizes="10" layout="prev, pager, next" :total="tableData.length">
  </el-pagination>
  </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import axios from 'axios';

import { getTime } from '../utils/formatter';

export default {
  setup() {
    const tableData = ref([])
    const currentPage = ref(1)
    const pagesize = ref(10)
    const current_change = (currentPages) =>{
      currentPage.value = currentPages;
    }
    const initEcharts = (titleName,myChart,time,yAxisOptions,seriesName,buriedpoina) => {
      myChart.setOption({
        title: { text: titleName },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom:{
          type: 'inside'
        },
        grid:{
          left: '15%'
        },
        xAxis: {
          data: time,
          show: true,
          axisTick:{
            alignWithLabel: true
          },
          axisLabel:{
            formatter: function(value){
              return value.split(' ')[1]
            }
          }
        },
        yAxis: yAxisOptions,
        series: [
          {
            name: seriesName,
            type: 'line',
            color: yAxisOptions.axisLabel.color,
            data: buriedpoina,
          }
        ],
      });
    };
    onMounted(() => {
      axios
        .get('http://localhost:5002/getList')
        .then((params) => {
          const dataList = params.data.data;
          let time = [];
          let buriedpoina = []
          let buriedpoinb = []
          let buriedpoind = []
          let eventTypeList = []
          dataList.map((item) => {
            if(item.local_time){
              time.push( getTime(item.local_time * 1));
              buriedpoina.push(item.buriedpoina == "a21b1" ? 'A应用' : 'B应用')
              buriedpoinb.push(item.buriedpoinb.split('-')[1] == 'a' ? 'index' : 'index2')
              buriedpoind.push(item.buriedpoind)
            }
            if(item.event_type){
              item.local_time = item.local_time ? getTime(item.local_time * 1) : ''
              item.server_time = item.server_time ? getTime(item.server_time * 1) : ''
              eventTypeList.push(item)
            }
          });
          tableData.value = eventTypeList
          const myChart = echarts.init(document.getElementById('myChart'));
          const myChart1 = echarts.init(document.getElementById('myChart1'));
          const myChart2 = echarts.init(document.getElementById('myChart2'));
          const yAxisOptions = {
            data: ['A应用','B应用'],
            axisTick:{
              alignWithLabel: true
            },
            axisLabel:{
              color: 'red'
            }
          }
          initEcharts('应用PV',myChart,time,yAxisOptions,'应用PV',buriedpoina)
          const yAxisOptions1 = {
          data: ['index','index2'],
          axisTick:{
            alignWithLabel: true
          },
          axisLabel:{
            color: 'blue'
          }
        }
        initEcharts('页面PV',myChart1,time,yAxisOptions1,'页面PV',buriedpoinb)
        const yAxisOptions2 = {
          data: ['main100','main1','main2','main3','main4','main5'],
          axisTick:{
            alignWithLabel: true
          },
          axisLabel:{
            color: 'green',
            formatter: function(value){
              return  value
            }
          }
        }
        initEcharts('点击区域PV',myChart2,time,yAxisOptions2,'点击区域PV',buriedpoind)
        })
        .catch((err) => {
          console.log('获取数据失败', err.message);
      });
    });
    return {
      tableData,
      currentPage,
      pagesize,
      current_change
    };
  },
};
</script>

<style  scoped>
.te{
  display: flex;
  justify-content: flex-start;
  height: 300px;
}
.table{
  width: 100%;
  height:400px;
  margin-top:10px;
  padding: 0 20px;
  box-sizing: border-box;
}
.pagination{
  margin-top:10px;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
