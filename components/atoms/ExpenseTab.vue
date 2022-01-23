<template>
  <ul class="expense-tab-container">
    <li
      class="expense"
      :class="{ '-active': expenseType === ExpenseType.Expense }"
      @click="$emit('change', changeTab(ExpenseType.Expense))"
    >
      支出
    </li>
    <li
      class="income"
      :class="{ '-active': expenseType === ExpenseType.Income }"
      @click="$emit('change', changeTab(ExpenseType.Income))"
    >
      収入
    </li>
  </ul>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { ExpenseType } from '~/utils/enum';

export default defineComponent({
  setup() {
    const expenseType = ref<ExpenseType.Expense | ExpenseType.Income>(
      ExpenseType.Expense,
    );

    const changeTab = computed(
      () =>
        (val: ExpenseType.Expense | ExpenseType.Income): ExpenseType => {
          return (expenseType.value = val);
        },
    );

    return {
      changeTab,
      expenseType,
      ExpenseType,
    };
  },
});
</script>
