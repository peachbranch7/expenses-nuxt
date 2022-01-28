<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <section>
      <h2>{{ label }}</h2>
      <Datepicker
        v-model="inputValue"
        class="input-date-form"
        :format="datePicker.format"
        :value="datePicker.date"
      />
      <P v-if="errors" class="caution">{{ errors[0] }}</P>
    </section>
  </ValidationProvider>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { Dayjs } from 'dayjs';
import { ValidationProvider } from 'vee-validate';
import Datepicker from 'vuejs-datepicker';

export default defineComponent({
  components: {
    Datepicker,
    ValidationProvider,
  },
  props: {
    rules: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    setValue: {
      type: Dayjs,
      required: true,
    },
    isIncome: {
      type: Boolean,
      default: false,
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
