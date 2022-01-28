<template>
  <section class="index-container">
    <TabMenu :options="tabMenuOptions" @enter="(v) => (isActive = v)" />
    <ExpenseCard
      v-if="isActive === TabMenuOption.Home"
      :expense-list-item="expenseArray"
      :income-list-item="incomeArray"
    />
    <InputFormContainer v-if="isActive === TabMenuOption.Home" />
  </section>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api';
import { collection, onSnapshot } from 'firebase/firestore';
import useUrls from '~/utils/useUrls';
import ExpenseCard from '~/components/molecules/ExpenseCard.vue';
import TabMenu from '~/components/molecules/TabMenu.vue';
import { tabMenuOptions } from '~/mixins/TabMenuOptions';
import { expenseOptions, incomeOptions } from '~/mixins/categoryItems';
import { TabMenuOption } from '~/utils/enum';
import db from '~/plugins/firebase';
import InputFormContainer from '~/components/organisms/InputFormContainer.vue';

export default defineComponent({
  components: {
    ExpenseCard,
    TabMenu,
    InputFormContainer,
  },
  setup() {
    const isActive = ref<string>(TabMenuOption.Home);

    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    const expenseRef = collection(db, 'expense');
    // const incomeRef = collection(db, 'income');

    onBeforeMount(() => {
      onSnapshot(expenseRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          return expenseArray.value.push(change.doc.data());
        });
      });
    });

    return {
      useUrls,
      isActive,
      expenseOptions,
      incomeOptions,
      tabMenuOptions,
      expenseArray,
      incomeArray,
      TabMenuOption,
    };
  },
});
</script>
