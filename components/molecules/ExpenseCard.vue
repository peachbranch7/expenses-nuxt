<template>
  <article class="expense-card">
    <ul v-for="item in expenseListItem" :key="item.id" class="container">
      <li class="date -expense">
        {{ convertDateFormat(item.date) }}
      </li>
      <li class="category">{{ item.category }}</li>
      <li class="box">
        <img :src="getCategoryImage(item.category)" class="img" />
        <p class="price">{{ item.price }}</p>
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { CardListItem } from '~/types/front-type';
import { convertDateFormat, getCategoryImage } from '~/utils/helpers';

export default defineComponent({
  props: {
    expenseListItem: {
      type: Array as PropType<CardListItem>,
      required: true,
    },

    // incomeListItem: {
    //   type: Array as PropType<CardListItem>,
    //   required: true,
    // },
  },
  setup() {
    return {
      getCategoryImage,
      convertDateFormat,
    };
  },
});
</script>
