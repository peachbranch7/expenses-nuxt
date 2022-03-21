<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script lang="ts">
import '@fullcalendar/core/vdom';
import { defineComponent } from '@nuxtjs/composition-api';
// NOTE: DayCellContentArgをimportできなかったため使用
// eslint-disable-next-line import/named
import FullCalendar, { DayCellContentArg } from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { tabMenuOptions } from '~/mixins/TabMenuOptions';
import { formValuesStore } from '@/store';
import { PostDoc } from '~/types/front-type';
import { convertDateFormatWithHyphen } from '@/utils/helpers';

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const store = formValuesStore;
    const events = store.getPostDoc;

    const formatEvents = (events: PostDoc[]) => {
      return events.map((event: PostDoc) => {
        return {
          id: 1,
          title: `${
            event.postType ? `収入 ${event.price}` : `支出 ${event.price}`
          }`,
          start: convertDateFormatWithHyphen(event.date.seconds),
          backgroundColor: event.postType ? '#FC7A62' : null,
        };
      });
    };

    const calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: '',
      },
      initialView: 'dayGridMonth',
      locale: 'ja',
      dayCellContent: (arg: DayCellContentArg) => {
        arg.dayNumberText = arg.dayNumberText.replace('日', '');
      },
      buttonText: {
        today: '今月',
      },
      events: [...formatEvents(events)],
    };
    return {
      calendarOptions,
      tabMenuOptions,
    };
  },
});
</script>
