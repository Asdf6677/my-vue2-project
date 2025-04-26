<template>
  <div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
    <div>zheshixinz</div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid"; //日历格子显示
import interactionPlugin from "@fullcalendar/interaction"; //交互
import timeGridPlugin from "@fullcalendar/timegrid"; //日历时间轴显示
import zhLocale from "@fullcalendar/core/locales/zh-cn"; //中文
import dayjs from "dayjs"; //时间处理

export default {
  name: "Calendar",
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // 引入插件
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives", // 隐藏许可提示
        initialView: "timeGridWeek",
        headerToolbar: false, // 隐藏头部
        locale: "zh-cn", // 中文
        locales: [zhLocale], // 引入中文
        firstDay: "1", // 设置一周中显示的第一天是周几，周日是0，周一是1，以此类推
        handleWindowResize: true, // 窗口大小变化时重新渲染
        allDaySlot: false, // 显示全天
        weekNumberCalculation: "ISO", // 周数计算方式，ISO 表示按照 ISO 8601 标准计算
        eventCOlor: "#3d8eec", // 事件颜色
        slotEventOverlap: false, // 事件重叠
        aspectRatio: "2", // 设置日历单元格宽高比
        height: "300px", // 设置日历高度
        fixedWeekCount: false, // 固定周数
        events: [], // 事件数组
        eventTimeFormat: {
          // like '14:30:00'
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        },
        editable: false, // 是否可编辑
        selectable: true, // 是否可选择
        selectMirror: true, // 选择时是否显示预览
        dayMaxEvents: true, // allow "more" link when too many events
        moreLinkContent: this.moreLinkContent,
        weekends: true, // 是否显示周末
        navLinks: false, // 是否显示左右箭头
        selectHelper: false, // 是否显示选择框
        selectEventOverlap: false, // 是否允许事件重叠
        nowIndicator: true, // 是否显示当前时间
        now: dayjs().format("YYYY-MM-DD HH:mm:ss"), // 当前时间
        select: this.handleDateSelect, // 选择日期事件
        dateClick: this.handleDateClick, // 点击日期事件
        eventClick: this.handleEventClick, // 点击事件
        eventResize: this.onEventResize,
        eventTimeFormat: {
          // like '14:30:00'
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        },
        moreLinkContent(arg) {
          return "还有" + arg.num + "个日程";
        },
      },
      scheduleList: [
        {
          $_id: 211,
          calendar_id: 45,
          color: "",
          end_time: "2025-04-25T09:30:00",
          instructions: "",
          is_allday: 0,
          name: "测试",
          schedule_calendar: { color: "#aa47bc", name: "测试日历" },
          source: "default",
          start_time: "2025-04-25T08:00:00",
        },
        {
          $_id: 212,
          calendar_id: 45,
          color: "",
          end_time: "2025-04-25T12:00:00",
          instructions: "",
          is_allday: 1,
          name: "测试1",
          schedule_calendar: { color: "#aa47bc", name: "测试日历" },
          source: "default",
          start_time: "2025-04-25T14:00:00",
        },
      ],
    };
    },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
          this.calendarOptions.events = this.scheduleList.map((item) => {
        return {
          id: item.$_id,
          title: item.name, //日程标题
          start: dayjs(item.start_time).format("YYYY-MM-DD HH:mm"), //日程开始时间
          // 针对设置全天，默认将时分秒设置为00:00:00 会在end时间之间结束（判断已全天形式设定end时间+1）
          end: this.isAllDay(item.start_time, item.end_time)
            ? dayjs(item.end_time).add(1, "day").format("YYYY-MM-DD HH:mm")
            : dayjs(item.end_time).format("YYYY-MM-DD HH:mm"),
          allDay:
            this.isAllDay(item.start_time, item.end_time) || item.is_allday,
          // color: (dayjs(item.end_time)).isBefore(dayjs())?'#cfcfcf':'rgb(225, 234, 255)' ,
          backgroundColor: item.color, //背景色
          borderColor: item.color, //边框色
          textColor: item.color, //文字颜色
          className: "text-normal", //日程元素可自定义class名称
          // 非标准字段:除上述字段外，您还可以在每个事件对象中包含自己的非标准字段。FullCalendar不会修改或删除这些字段。例如，开发人员通常包括描述在回调中使用的字段，如事件呈现挂钩. 任何非标准属性都将移动到extendedProps哈希期间事件解析.
          extendedProps: {
            start: item.start_time
              ? dayjs(item.start_time).format("YYYY-MM-DD HH:mm")
              : "",
            end_time: item.end_time
              ? dayjs(item.end_time).format("YYYY-MM-DD HH:mm")
              : "",
            remark: item.remark,
            schcolor: item.color || "",
            calendarColor: item.schedule_calendar?.color || "",
          },
        };
      });
      },
    isAllDay(startTime, endTime) {
      // 判断是否是全天
      const start = dayjs(startTime);
      const end = dayjs(endTime);

      // 如果开始时间和结束时间的小时和分钟都为00:00，则认为是全天
        return start.hour() === 0 && start.minute() === 0 && end.hour() === 0 && end.minute() === 0;
      
    },
    // 选择日期事件
    handleDateClick(arg) {
      console.log(arg,'选择日期事件');
    },
    // 点击事件
    handleEventClick(arg) {
      console.log(arg,'点击事件');
    },
    // 调整事件大小
    onEventResize(arg) {
      console.log(arg,'调整事件大小');
    },
  },
};
</script>
<!-- https://github.com/Asdf6677/my-vue2-project.git -->