<template>
  <div class="input-form-container">
    <BasicExpenseTab @change="(v) => (expenseType = v)" />
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
        @click="confirmFormValues"
        >確認へ</AppButton
      >
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationObserver } from 'vee-validate';
import AppRadioButton from '~/components/molecules/AppRadioButton.vue';
import AppInputForm from '~/components/molecules/AppInputForm.vue';
import AppButton from '~/components/atoms/AppButton.vue';
import { FormValuesType } from '~/types/front-type';
import InputDateForm from '~/components/molecules/InputDateForm.vue';
import { ExpenseType } from '~/utils/enum';
import { formValuesStore, authStore } from '@/store';
import { expenseOptions, incomeOptions } from '~/mixins/categoryItems';
import BasicExpenseTab from '~/components/atoms/BasicExpenseTab.vue';

export default defineComponent({
  components: {
    ValidationObserver,
    AppRadioButton,
    AppInputForm,
    AppButton,
    InputDateForm,
    BasicExpenseTab,
  },
  setup(_, { emit }) {
    const expenseType = ref<ExpenseType.Expense | ExpenseType.Income>(
      ExpenseType.Expense,
    );

    // TODO: any警察
    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    const selectedOption = ref<number>(1);
    const isActiveModal = ref<boolean>(false);
    const currentUserId: string = authStore.getUserUid;

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
      uid: currentUserId,
      date: '',
      price: '',
      memo: '',
      category: '',
    });

    const onClick = (category: string, selectedOption: number) => {
      formValues.value.category = category;
      getSelectedOption(selectedOption);
    };

    const confirmFormValues = () => {
      formValuesStore.dispatchFormValues(formValues.value);
      emit('click', (isActiveModal.value = true));
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
      confirmFormValues,
      formValues,
      onClick,
    };
  },
});
</script>
