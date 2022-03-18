<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <section class="app-input-form-container">
      <h2 class="title">{{ label }}</h2>
      <input
        v-model="inputValue"
        type="text"
        class="input"
        name="inputName"
        autocomplete="off"
        :placeholder="placeholder"
      />
      <P v-if="errors" class="caution">{{ errors[0] }}</P>
    </section>
  </ValidationProvider>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { ValidationProvider } from 'vee-validate';
import '~/utils/validation-rule';

export default defineComponent({
  components: {
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
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputName: {
      type: String,
      default: '',
    },
    isIncome: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.setValue,
      set: (value: string) => emit('input', value),
    });

    return {
      inputValue,
    };
  },
});
</script>
