<template>
  <section>
    <h2>{{ label }}</h2>
    <Datepicker
      v-model="inputValue"
      class="input-date-form"
      :format="datePicker.format"
      :value="datePicker.date"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
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
    setValue: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    const datePicker = {
      date: new Date(),
      format: 'yyyy-MM-dd',
    };
    const inputValue = computed({
      get: () => datePicker.date,
      set: (value) => emit('input', value),
    });
    return {
      datePicker,
      inputValue,
    };
  },
});
</script>
