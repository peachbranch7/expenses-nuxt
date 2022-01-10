<template>
  <section class="index-container">
    <div class="container">
      <div class="wrapper">
        <ul class="index-title-wrapper">
          <li
            class="expense"
            :class="{ '-active': expenseType === ExpenseType.Expense }"
            @click="changeTab(ExpenseType.Expense)"
          >
            支出
          </li>
          <li
            class="income"
            :class="{ '-active': expenseType === ExpenseType.Income }"
            @click="changeTab(ExpenseType.Income)"
          >
            収入
          </li>
        </ul>
        <ExpenseCard
          :expense-list-item="expenseArray"
          :income-list-item="incomeArray"
          :is-active="expenseType"
        />
      </div>
      <div class="form-container">
        <h2 class="title">簡単入力</h2>
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
          tag="div"
          class="container"
        >
          <InputDateForm
            label="日付"
            :set-value="formValues.date"
            rules="required"
            :is-income="expenseType === 1"
            @input="(v) => (formValues.date = v)"
          />
          <InputForm
            label="金額"
            rules="required|number"
            placeholder="¥ 金額を入力してください"
            :set-value="formValues.price"
            :is-income="expenseType === 1"
            input-name="price"
            @input="(v) => (formValues.price = v)"
          />
          <AppRadioButton
            label="カテゴリー"
            :options="expenseType === 0 ? expenseOptions : incomeOptions"
            :selected-option="selectedOption"
            :expense-type="expenseType"
            :is-income="expenseType === 1"
            class="radiobutton"
            @change="(v) => getSelectedOption(v)"
          />
          <InputForm
            label="メモ"
            placeholder="例）母とディナー"
            :set-value="formValues.memo"
            :is-income="expenseType === 1"
            input-name="memo"
            @input="(v) => (formValues.memo = v)"
          />
          <AppButton
            :is-income="expenseType === ExpenseType.Income"
            :disabled="invalid"
            @click="save()"
            >確認へ</AppButton
          >
        </ValidationObserver>
        <button @click="add()">テスト</button>
        {{ test }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api';
import { ValidationObserver } from 'vee-validate';
import {
  collection,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { expenseOptions, incomeOptions } from '~/mixins/categoryItems';
import AppRadioButton from '~/components/atoms/AppRadioButton.vue';
import ExpenseCard from '~/components/atoms/ExpenseCard.vue';
import InputForm from '~/components/atoms/InputForm.vue';
import AppButton from '~/components/atoms/AppButton.vue';
import { ExpenseType } from '~/utils/enum';
import { FormValuesType } from '~/types/front-type';
import InputDateForm from '~/components/atoms/InputDateForm.vue';
import { getCategoryName } from '~/utils/helpers';
import db from '~/plugins/firebase';
import { formValuesStore } from '@/store';

export default defineComponent({
  components: {
    ExpenseCard,
    AppRadioButton,
    InputForm,
    AppButton,
    ValidationObserver,
    InputDateForm,
  },
  setup() {
    const expenseType = ref<ExpenseType.Expense | ExpenseType.Income>(
      ExpenseType.Expense,
    );

    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    const selectedOption = ref<number>(1);
    const expenseRef = collection(db, 'expense');
    const incomeRef = collection(db, 'income');
    const isActiveModal = ref<boolean>(false);

    const formValues = ref<FormValuesType>({
      date: '',
      price: '',
      memo: '',
      category: '',
    });

    const add = async (): Promise<void> => {
      await addDoc(expenseType.value === 0 ? expenseRef : incomeRef, {
        date: formValues.value.date,
        price: formValues.value.price,
        memo: formValues.value.memo,
        category: getCategoryName(selectedOption.value, expenseType.value),
      });
    };

    onBeforeMount(async (): Promise<void> => {
      await getDocs(expenseRef).then((querySnapshot) => {
        querySnapshot.forEach((doc: DocumentSnapshot) => {
          return expenseArray.value.push(doc.data());
        });
      });
    });

    onBeforeMount(async (): Promise<void> => {
      await getDocs(incomeRef).then((querySnapshot) => {
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          return incomeArray.value.push(doc.data());
        });
      });
    });

    const changeTab = (
      val: ExpenseType.Expense | ExpenseType.Income,
    ): ExpenseType => {
      return (expenseType.value = val);
    };

    const getSelectedOption = (id: number): void => {
      if (!selectedOption.value) return;
      if (expenseType.value === 0) {
        selectedOption.value = expenseOptions.find((option) => option.id === id)
          ?.id as number;
      } else {
        selectedOption.value = incomeOptions.find((option) => option.id === id)
          ?.id as number;
      }
    };

    const save = () => {
      formValuesStore.dispatchFormValues(formValues.value);
      add();
      isActiveModal.value = true;
    };

    const test = formValuesStore.getFormValues();

    return {
      changeTab,
      expenseType,
      expenseOptions,
      incomeOptions,
      getSelectedOption,
      selectedOption,
      ExpenseType,
      expenseArray,
      incomeArray,
      save,
      add,
      formValues,
      test,
    };
  },
});
</script>
