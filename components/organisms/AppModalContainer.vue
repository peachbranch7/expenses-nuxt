<template>
  <AppModal>
    <template #modal-content>
      <ul class="container">
        <li class="list">
          <h2 class="title">日付</h2>
          <!-- <p class="text">{{ convertTimeZornFormat(formValues.date) }}</p> -->
        </li>
        <li>
          <h2 class="title">金額</h2>
          <p class="text">{{ formValues.price }}</p>
        </li>
        <li>
          <h2 class="title">カテゴリー</h2>
          <p class="text">{{ formValues.category }}</p>
        </li>
        <li>
          <h2 class="title">メモ</h2>
          <p class="text">{{ formValues.memo }}</p>
        </li>
        <AppButton color-option="navy" @click="save()">送信</AppButton>
      </ul>
    </template>
  </AppModal>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { collection, CollectionReference } from 'firebase/firestore';
import AppModal from '~/components/molecules/AppModal.vue';
import { authStore, formValuesStore } from '@/store';
import AppButton from '~/components/atoms/AppButton.vue';
import useCollection from '~/compositions/useCollection';
import { db } from '~/plugins/firebase';
import { FormValuesType } from '~/types/front-type';
import { convertTimeZornFormat } from '~/utils/helpers';

export default defineComponent({
  components: {
    AppModal,
    AppButton,
  },
  setup(_, { emit }) {
    // TODO: any警察
    const expenseRef: CollectionReference<any> = collection(db, 'expense');
    const { add } = useCollection(expenseRef);
    const currentUserId = authStore.getUserUid;

    const formValues = ref<FormValuesType>(formValuesStore.getFormValues);

    const save = async () => {
      await add({
        uid: currentUserId,
        date: formValues.value.date,
        price: formValues.value.price,
        memo: formValues.value.memo,
        category: formValues.value.category,
      });
      formValuesStore.dispatchInitFormValues();
      window.location.reload();
      emit('send', false);
    };
    return {
      save,
      formValues,
      convertTimeZornFormat,
    };
  },
});
</script>
