<template>
  <button class="app-button" :class="style" @click="$emit('click')">
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isIncome: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const style = computed(() => {
      return { '-income': props.isIncome, '-disabled': props.disabled };
    });
    return {
      style,
    };
  },
});
</script>
