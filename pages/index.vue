<template>
  <section class="index-container">
    <AppTabMenu :options="tabMenuOptions" @enter="(v) => (isActive = v)" />
    <ExpenseCard
      v-if="isActive === TabMenuOption.Home"
      :expense-list-item="expenseArray"
    />
    <InputFormContainer
      v-if="isActive === TabMenuOption.Home"
      @click="(v) => (isOpenModal = v)"
      @change-tab="(v) => (expenseType = v)"
    />
    <AppModalContainer
      v-if="isOpenModal"
      @send="(v) => (isOpenModal = v)"
    ></AppModalContainer>
  </section>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import useUrls from '~/utils/useUrls';
import ExpenseCard from '~/components/molecules/ExpenseCard.vue';
import AppTabMenu from '~/components/molecules/AppTabMenu.vue';
import { tabMenuOptions } from '~/mixins/TabMenuOptions';
import { expenseOptions, incomeOptions } from '~/mixins/categoryItems';
import { ExpenseType, TabMenuOption } from '~/utils/enum';
import { db } from '~/plugins/firebase';
import InputFormContainer from '~/components/organisms/InputFormContainer.vue';
import AppModalContainer from '~/components/organisms/AppModalContainer.vue';
import { authStore } from '@/store';

export default defineComponent({
  components: {
    ExpenseCard,
    AppTabMenu,
    AppModalContainer,
    InputFormContainer,
  },
  setup() {
    const expenseType = ref<ExpenseType>(ExpenseType.Expense);
    const isActive = ref<string>(TabMenuOption.Home);
    const isOpenModal = ref<boolean>(false);

    // TODO: any警察
    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    // const incomeRef = collection(db, 'income');

    const currentUserId = authStore.getUserUid;

    // TODO: any警察
    const expenseRef: any = query(
      collection(db, 'expense'),
      where('uid', '==', currentUserId),
    );

    // TODO: any警察
    onBeforeMount(() => {
      onSnapshot(expenseRef, (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          return expenseArray.value.push(change.doc.data());
        });
      });
    });

    // onBeforeMount(() => {
    //   onSnapshot(incomeRef, (snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       return incomeArray.value.push(change.doc.data());
    //     });
    //   });
    // });

    return {
      useUrls,
      isActive,
      expenseOptions,
      incomeOptions,
      tabMenuOptions,
      expenseArray,
      incomeArray,
      TabMenuOption,
      isOpenModal,
      expenseType,
      ExpenseType,
    };
  },
});
</script>
