<template>
  <div>
    <full-calendar
        ref="fullCalendar"
        :options="calendarOptions"
        class="full-calendar-box"
        style="height: 100%"
      >
      </full-calendar>
  </div>
</template>
<script>

import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar,
  },
  name: 'HelloWorld',
  data() {
    return {
      calendarOptions: {
        plugins: [ resourceTimelinePlugin,interactionPlugin ],
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",// 隐藏许可提示
        height: 'auto',
        contentHeight: '100%',
        timeZone: 'UTC',
        initialView: 'resourceTimelineDay',
        scrollTime: '08:00',
        aspectRatio: 1.5,
        eventOverlap: false, // 禁止事件重叠
        views: {
          resourceTimelineDay: {
            buttonText: ':30 slots',
            slotDuration: '00:15',
            dayMaxEventRows: 1,
          }
        },
        headerToolbar: { // 设置表头
          left: '',
          center: '',
          right: ''
        },
        slotMinTime: '00:00:00', // 开始时间
        slotMaxTime: '24:00:00', // 结束时间
        slotLabelInterval: '00:30:00', // 设置标签间隔30分钟
        slotLabelFormat: { // 左侧时间格式
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // false设置时间为24小时
        },
        eventTimeFormat: {
          // 格式化节点时间为24小时制
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24小时制
        },
        editable: false, //是否可以拖动
        selectAllow: function (selectInfo) {
          console.log(selectInfo,'selectInfo');
          // let startTime = selectInfo.startStr.split('T')[0] + ' ' + selectInfo.startStr.split('T')[1].split('Z')[0]
          // // 禁止选择过去的时间
          // if (new Date(startTime).getTime() < new Date().getTime()) {
          //   return false;
          // }
          return true;
        },
        // resourceAreaHeaderContent: '表头',
        // resourceGroupLabelContent:'表头',
        resourceAreaColumns: [
          {
            headerContent: '序号',
            width: "50px",
            cellClassNames:'index',
            field: 'index'
          },
          {
            headerContent: '名称',
            field: 'name',
            cellContent: function(arg) {
              return {
                html: `<span style="cursor: pointer;color:#2c7af8">${arg.fieldValue}</span>`,
              };
            },
            cellDidMount: (el)=>{
              el.el.addEventListener('click', () => {
                console.log(el,'el');
                // this.handleClick(el)
              });
            }
          },
        ],
        resourceOrder: 'index',
        resources: [
        { id: '1', name: '会议室1', index: 1 },
        { id: '2', name: '会议室2', index: 2 },
        // 添加更多资源
      ],
        events: [
        {
          id: '1',
          title: '事件1',
          start: '2024-07-01T08:00:00Z',
          end: '2024-07-01T10:00:00Z',
          resourceId: '1', // 确保 resourceId 对应 resources 中的 id
          name: 'event1',
        }
      ],
        eventContent: function(arg) {
          // 自定义事件内容显示
          const title = arg.event.title;
          return {
            html: `<div title="${title}" class="fc-event-title">
              ${arg.event.title}
            </div>`
          };
        },
        select:this.eventSelect,
        eventClick: this.eventClick, // 事件点击事件
      }
    }
  },
  created() {
    this.initCalendar();
  },
  methods: {
    initCalendar() {
      
      
    },
    eventSelect(selectInfo) {
      console.log(selectInfo,'selectInfo');
    },
    eventClick(arg) {
      console.log(arg,'arg');
    }
  }
}
</script>