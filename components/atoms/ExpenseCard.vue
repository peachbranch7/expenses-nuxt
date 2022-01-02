<template>
  <article class="content">
    <template v-if="isActive === ExpenseType.Expense">
      <ul v-for="item in expenseListItem" :key="item.id" class="expense-card">
        <li class="date -expense">{{ item.date }}</li>
        <li class="category">{{ item.category }}</li>
        <li class="box">
          <img :src="item.img" alt="お金" class="img" />
          <p class="price">{{ item.price }}</p>
        </li>
      </ul>
    </template>
    <template v-if="isActive === ExpenseType.Income">
      <ul v-for="item in incomeListItem" :key="item.id" class="expense-card">
        <li class="date -income">{{ item.date }}</li>
        <li class="category">{{ item.category }}</li>
        <li class="box">
          <img :src="item.img" alt="お金" class="img" />
          <p class="price">{{ item.price }}</p>
        </li>
      </ul>
    </template>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { ExpenseType } from '~/utils/enum';
import { CardListItem } from '~/types/front-type';

export default defineComponent({
  props: {
    expenseListItem: {
      type: Array as PropType<CardListItem>,
      required: true,
    },

    incomeListItem: {
      type: Array as PropType<CardListItem>,
      required: true,
    },

    isActive: {
      type: Number as PropType<ExpenseType.Expense | ExpenseType.Income>,
      required: false,
      default: ExpenseType.Expense,
    },
  },
  setup() {
    return {
      ExpenseType,
    };
  },
});
</script>
