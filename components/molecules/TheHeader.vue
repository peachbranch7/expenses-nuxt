<template>
  <header class="header-container">
    <div class="container">
      <AppLink :to="useUrls.topLink" class="title">Expenses</AppLink>
      <div class="humburger">aaaa</div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppLink from '@/components/atoms/AppLink.vue';
import useUrls from '@/utils/useUrls';

export default defineComponent({
  components: {
    AppLink,
  },
  setup() {
    return {
      useUrls,
    };
  },
});
</script>
