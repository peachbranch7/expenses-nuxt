<template>
  <section>
    <h2>{{ label }}</h2>
    <Datepicker
      class="input-date-form"
      :format="datePicker.format"
      :value="datePicker.date"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Datepicker from 'vuejs-datepicker';

export default defineComponent({
  components: {
    Datepicker,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const datePicker = {
      date: new Date(),
      format: 'yyyy-MM-dd',
    };
    return {
      datePicker,
    };
  },
});
</script>
