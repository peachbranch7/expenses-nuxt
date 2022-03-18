<template>
  <div class="calendar-container">
    <FullCalendar
      locale="ja"
      :options="calendarOptions"
      locales="{allLocales}"
    />
  </div>
</template>

<script lang="ts">
import '@fullcalendar/core/vdom';
import { defineComponent } from '@nuxtjs/composition-api';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import { tabMenuOptions } from '~/mixins/TabMenuOptions';

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
      tabMenuOptions,
    };
  },
});
</script>
