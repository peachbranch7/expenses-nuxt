<template>
  <section class="index-container">
    <div class="container">
      <div class="wrapper">
        <ul class="index-title-wrapper">
          <li
            class="expense"
            :class="{ '-active': isActive === ExpenseType.Expense }"
            @click="changeTab(ExpenseType.Expense)"
          >
            支出
          </li>
          <li
            class="income"
            :class="{ '-active': isActive === ExpenseType.Income }"
            @click="changeTab(ExpenseType.Income)"
          >
            収入
          </li>
        </ul>
        <ExpenseCard
          :expense-list-item="expenseListItem"
          :income-list-item="incomeListItem"
          :is-active="isActive"
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
          <h2>日付</h2>
          <input type="date" class="input" />
          <InputForm
            label="金額"
            rules="required|number"
            placeholder="¥ 金額を入力してください"
            :set-value="priceValue"
            input-name="price"
            @input="(v) => (priceValue = v)"
          />
          <AppRadioButton
            label="カテゴリー"
            :options="options"
            :selected-option="selectedOption"
            class="radiobutton"
            @change="(v) => getSelectedOption(v)"
          />
          <InputForm
            label="メモ"
            rules="required"
            placeholder="例）母とディナー"
            :set-value="memoValue"
            input-name="memo"
            @input="(v) => (memoValue = v)"
          />
          <button class="button" :disabled="invalid" @click="save()">
            確認へ
          </button>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationObserver } from 'vee-validate';
import AppRadioButton from '~/components/atoms/AppRadioButton.vue';
import ExpenseCard from '~/components/atoms/ExpenseCard.vue';
import InputForm from '~/components/atoms/InputForm.vue';
import { ExpenseType } from '~/utils/enum';
import { CardListItem, CategoryItems } from '~/types/front-type';

export default defineComponent({
  components: {
    ExpenseCard,
    AppRadioButton,
    InputForm,
    ValidationObserver,
  },
  setup() {
    const priceValue = ref<string>('');
    const memoValue = ref<string>('');
    const selectedOption = ref<number>(1);
    const isActiveModal = ref<boolean>(false);

    const options: CategoryItems = [
      {
        id: 1,
        category: '食費',
        image: require('~/assets/images/icon/meal.svg'),
      },
      {
        id: 2,
        category: '衣類',
        image: require('~/assets/images/icon/clothing.svg'),
      },
      {
        id: 3,
        category: '日用品',
        image: require('~/assets/images/icon/daily-expense.svg'),
      },
      {
        id: 4,
        category: '美容代',
        image: require('~/assets/images/icon/beauty.svg'),
      },
      {
        id: 5,
        category: '通信費',
        image: require('~/assets/images/icon/phone.svg'),
      },
      {
        id: 6,
        category: '交際費',
        image: require('~/assets/images/icon/social-expense.svg'),
      },
    ];
    const expenseListItem: CardListItem = [
      {
        id: 1,
        date: '2021-06-20',
        category: '日用品',
        img: require('~/assets/images/icon/money.svg'),
        price: '12,000',
      },
      {
        id: 2,
        date: '2021-06-20',
        category: '日用品',
        img: require('~/assets/images/icon/money.svg'),
        price: '12,000',
      },
      {
        id: 3,
        date: '2021-06-20',
        category: '日用品',
        img: require('~/assets/images/icon/money.svg'),
        price: '12,000',
      },
    ];

    const incomeListItem: CardListItem = [
      {
        id: 1,
        date: '2021-06-25',
        category: '給料',
        img: require('~/assets/images/icon/money.svg'),
        price: '250,000',
      },
      {
        id: 2,
        date: '2021-06-24',
        category: '株',
        img: require('~/assets/images/icon/money.svg'),
        price: '900,000',
      },
      {
        id: 3,
        date: '2021-06-20',
        category: 'メルカリ',
        img: require('~/assets/images/icon/money.svg'),
        price: '14,000',
      },
    ];

    const isActive = ref<ExpenseType.Expense | ExpenseType.Income>(
      ExpenseType.Expense,
    );

    const changeTab = (val: ExpenseType.Expense | ExpenseType.Income) => {
      return (isActive.value = val);
    };

    const getSelectedOption = (id: number) => {
      if (!selectedOption.value) return;
      selectedOption.value = options.find((option) => option.id === id)?.id!;
    };

    const save = () => {
      isActiveModal.value = true;
    };

    return {
      priceValue,
      memoValue,
      expenseListItem,
      incomeListItem,
      changeTab,
      isActive,
      options,
      getSelectedOption,
      selectedOption,
      ExpenseType,
      save,
    };
  },
});
</script>
