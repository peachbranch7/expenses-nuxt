<template>
  <div class="default-layout">
    <TheHeader />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import TheHeader from '~/components/molecules/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {},
});
</script>
