<template>
  <section class="index-container">
    <AppTabMenu :options="tabMenuOptions" @enter="(v) => (isActive = v)" />
    <ExpenseCard
      v-if="isActive === TabMenuOption.Home"
      :expense-list-item="docs"
    />
    <InputFormContainer
      v-if="isActive === TabMenuOption.Home"
      @click="(v) => (isOpenModal = v)"
      @change-tab="(v) => (postType = v)"
    />
    <AppModalContainer
      v-if="isOpenModal"
      @send="(v) => (isOpenModal = v)"
      @close="isOpenModal = false"
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
import { PostType, TabMenuOption } from '~/utils/enum';
import { db } from '~/plugins/firebase';
import InputFormContainer from '~/components/organisms/InputFormContainer.vue';
import AppModalContainer from '~/components/organisms/AppModalContainer.vue';
import { authStore, formValuesStore } from '@/store';
import { PostCollectionData } from '~/types/front-type';

export default defineComponent({
  components: {
    ExpenseCard,
    AppTabMenu,
    AppModalContainer,
    InputFormContainer,
  },
  setup() {
    const postType = ref<PostType>(PostType.Expense);
    const isActive = ref<string>(TabMenuOption.Home);
    const isOpenModal = ref<boolean>(false);
    const docs = ref<PostCollectionData[]>([]);

    const currentUserId = authStore.getUserUid;

    // TODO: any警察
    const postsRef = query(
      collection(db, 'posts'),
      where('uid', '==', currentUserId),
    );

    // TODO: any警察
    onBeforeMount(() => {
      onSnapshot(postsRef, (snapshot) => {
        snapshot.docChanges().forEach((change: any) => {
          docs.value.push(change.doc.data());
          formValuesStore.addPostCollectionData(docs.value);
          return docs.value;
        });
      });
    });

    return {
      useUrls,
      isActive,
      expenseOptions,
      incomeOptions,
      tabMenuOptions,
      docs,
      TabMenuOption,
      isOpenModal,
      postType,
      PostType,
    };
  },
});
</script>
