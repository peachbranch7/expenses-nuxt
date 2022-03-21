<template>
  <section class="app-tab-menu-container">
    <ul class="list">
      <li
        v-for="(option, index) in options"
        :key="index"
        type="radio"
        class="item"
        :class="{ '-active': isActive === option.label }"
        @click="getTabMenuOption(option.label)"
      >
        <HomeIcon v-if="option.label === 'Home'" class="icon" />
        <ReportIcon v-if="option.label === 'Report'" class="icon" />
        <CalendarIcon v-if="option.label === 'Calendar'" class="icon" />
        <PostIcon v-if="option.label === 'Post'" class="icon" />
        <AppLink :to="option.link" class="link">{{ option.label }}</AppLink>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  useRouter,
} from '@nuxtjs/composition-api';
import HomeIcon from '~/components/atoms/icon/HomeIcon.vue';
import ReportIcon from '~/components/atoms/icon/ReportIcon.vue';
import CalendarIcon from '~/components/atoms/icon/CalendarIcon.vue';
import PostIcon from '~/components/atoms/icon/PostIcon.vue';
import AppLink from '~/components/atoms/AppLink.vue';
import useUrls from '~/utils/useUrls';
import { TabMenuOption } from '~/utils/enum';
import { TabMenuOptionType } from '~/types/front-type';

export default defineComponent({
  components: {
    HomeIcon,
    ReportIcon,
    CalendarIcon,
    PostIcon,
    AppLink,
  },
  props: {
    options: {
      type: Array as PropType<TabMenuOptionType[]>,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const isActive = ref<string>(TabMenuOption.Home);
    const router = useRouter();

    const link = () => {
      router.push('/calendar');
    };

    const getTabMenuOption = (option: string) => {
      isActive.value = option;
      emit('enter', isActive.value);
    };

    return {
      useUrls,
      isActive,
      getTabMenuOption,
      link,
    };
  },
});
</script>
