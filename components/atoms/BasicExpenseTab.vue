<template>
  <ul class="basic-expense-tab-container">
    <li
      class="expense"
      :class="{ '-active': postType === PostType.Expense }"
      @click="$emit('change', changeTab(PostType.Expense))"
    >
      支出
    </li>
    <li
      class="income"
      :class="{ '-active': postType === PostType.Income }"
      @click="$emit('change', changeTab(PostType.Income))"
    >
      収入
    </li>
  </ul>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { PostType } from '~/utils/enum';

export default defineComponent({
  setup() {
    const postType = ref<PostType.Expense | PostType.Income>(PostType.Expense);

    const changeTab = computed(
      () =>
        (val: PostType.Expense | PostType.Income): PostType => {
          return (postType.value = val);
        },
    );

    return {
      changeTab,
      postType,
      PostType,
    };
  },
});
</script>
