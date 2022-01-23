<template>
  <div class="input-form-container">
    <h2 class="title">Entry Form</h2>
    <ExpenseTab @change="(v) => (expenseType = v)" />
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="div"
      class="container"
    >
      <InputDateForm
        label="Date"
        :set-value="formValues.date"
        rules="required"
        :is-income="expenseType === 1"
        @input="(v) => (formValues.date = v)"
      />
      <AppInputForm
        label="Price"
        rules="required|number"
        placeholder="¥ 金額を入力してください"
        :set-value="formValues.price"
        :is-income="expenseType === 1"
        input-name="price"
        @input="(v) => (formValues.price = v)"
      />
      <AppRadioButton
        label="Category"
        :options="expenseType === 0 ? expenseOptions : incomeOptions"
        :selected-option="selectedOption"
        :expense-type="expenseType"
        :is-income="expenseType === 1"
        class="radiobutton"
        @change="
          (category, selectedOption) => onClick(category, selectedOption)
        "
      />
      <AppInputForm
        label="Memo"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationObserver } from 'vee-validate';
import { collection, CollectionReference } from 'firebase/firestore';
import AppRadioButton from '~/components/molecules/AppRadioButton.vue';
import AppInputForm from '~/components/molecules/AppInputForm.vue';
import AppButton from '~/components/atoms/AppButton.vue';
import { FormValuesType } from '~/types/front-type';
import InputDateForm from '~/components/molecules/InputDateForm.vue';
import { ExpenseType } from '~/utils/enum';
import db from '~/plugins/firebase';
import { formValuesStore } from '@/store';
import { expenseOptions, incomeOptions } from '~/mixins/categoryItems';
import { getCategoryName } from '~/utils/helpers';
import useCollection from '~/compositions/useCollection';
import ExpenseTab from '~/components/atoms/ExpenseTab.vue';

export default defineComponent({
  components: {
    ValidationObserver,
    AppRadioButton,
    AppInputForm,
    AppButton,
    InputDateForm,
    ExpenseTab,
  },
  setup() {
    const expenseType = ref<ExpenseType.Expense | ExpenseType.Income>(
      ExpenseType.Expense,
    );

    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    const selectedOption = ref<number>(1);
    const expenseRef: CollectionReference<any> = collection(db, 'expense');
    // const incomeRef: CollectionReference<any> = collection(db, 'income');
    const isActiveModal = ref<boolean>(false);

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

    const formValues = ref<FormValuesType>({
      date: '',
      price: '',
      memo: '',
      category: '',
    });

    const { add } = useCollection(expenseRef);

    const save = async () => {
      formValuesStore.dispatchFormValues(formValues.value);
      await add({
        date: formValues.value.date,
        price: formValues.value.price,
        memo: formValues.value.memo,
        category: getCategoryName(selectedOption.value, expenseType.value),
      });
      isActiveModal.value = true;
    };

    const onClick = (category: string, selectedOption: number) => {
      formValues.value.category = category;
      getSelectedOption(selectedOption);
    };

    return {
      expenseType,
      expenseOptions,
      incomeOptions,
      getSelectedOption,
      selectedOption,
      ExpenseType,
      expenseArray,
      incomeArray,
      save,
      formValues,
      onClick,
    };
  },
});
</script>
