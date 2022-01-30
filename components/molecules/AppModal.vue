<template>
  <section class="app-modal">
    <slot name="modal-content"></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {},
});
</script>
