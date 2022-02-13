<template>
  <FullCalendar locale="ja" :options="calendarOptions" locales="{allLocales}" />
</template>

<script lang="ts">
import '@fullcalendar/core/vdom'; // solves problem with Vite
import { defineComponent } from '@nuxtjs/composition-api';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: '',
      },
      initialView: 'dayGridMonth',
    };
    return {
      calendarOptions,
      allLocales,
    };
  },
});
</script>
