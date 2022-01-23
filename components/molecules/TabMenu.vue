<template>
  <section class="tab-menu-container">
    <ul class="list">
      <li
        v-for="(option, index) in options"
        :key="index"
        type="radio"
        class="item"
        :class="{ '-active': isActive === option.label }"
        @click="getTabMenuOption(option.label)"
      >
        <HomeIcon class="icon" />
        <AppLink class="link">{{ option.label }}</AppLink>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import HomeIcon from '~/components/atoms/icon/HomeIcon.vue';
import AppLink from '~/components/atoms/AppLink.vue';
import useUrls from '~/utils/useUrls';
import { TabMenuOption } from '~/utils/enum';

export default defineComponent({
  components: {
    HomeIcon,
    AppLink,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const isActive = ref<string>(TabMenuOption.Home);

    const getTabMenuOption = (option: string) => {
      isActive.value = option;
      emit('enter', isActive.value);
    };

    return {
      useUrls,
      isActive,
      getTabMenuOption,
    };
  },
});
</script>
