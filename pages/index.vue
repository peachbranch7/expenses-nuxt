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
          :income-list-item="incomeListItem"
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
            :set-value="dateValue"
            @input="(v) => (dateValue = v)"
          />
          <InputForm
            label="金額"
            rules="required|number"
            placeholder="¥ 金額を入力してください"
            :set-value="priceValue"
            :is-income="expenseType === 1"
            input-name="price"
            @input="(v) => (priceValue = v)"
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
            :set-value="memoValue"
            :is-income="expenseType === 1"
            input-name="memo"
            @input="(v) => (memoValue = v)"
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
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationObserver } from 'vee-validate';
import {
  collection,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import AppRadioButton from '~/components/atoms/AppRadioButton.vue';
import ExpenseCard from '~/components/atoms/ExpenseCard.vue';
import InputForm from '~/components/atoms/InputForm.vue';
import AppButton from '~/components/atoms/AppButton.vue';
import { ExpenseType } from '~/utils/enum';
import { CardListItem, CategoryItems } from '~/types/front-type';
import InputDateForm from '~/components/atoms/InputDateForm.vue';
import { getCategoryName } from '~/utils/helpers';
import db from '~/plugins/firebase';

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
    const priceValue = ref<string>('');
    const memoValue = ref<string>('');
    const dateValue = ref<string>('');
    const expenseArray = ref<any>([]);
    const incomeArray = ref<any>([]);
    const selectedOption = ref<number>(1);
    const expenseRef = collection(db, 'expense');
    const incomeRef = collection(db, 'income');

    const add = async () => {
      await addDoc(expenseRef, {
        date: dateValue.value,
        price: priceValue.value,
        memo: memoValue.value,
        category: getCategoryName(selectedOption.value),
      });
    };

    getDocs(expenseRef).then((querySnapshot) => {
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        expenseArray.value.push(doc.data());
      });
      return expenseArray;
    });

    getDocs(incomeRef).then((querySnapshot) => {
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        incomeArray.value.push(doc.data());
      });
      return incomeArray;
    });

    const isActiveModal = ref<boolean>(false);

    const expenseOptions: CategoryItems = [
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

    const incomeOptions: CategoryItems = [
      {
        id: 1,
        category: '給料',
        image: require('~/assets/images/icon/meal.svg'),
      },
      {
        id: 2,
        category: '副業',
        image: require('~/assets/images/icon/clothing.svg'),
      },
      {
        id: 3,
        category: '宝くじ',
        image: require('~/assets/images/icon/daily-expense.svg'),
      },
      {
        id: 4,
        category: '臨時収入',
        image: require('~/assets/images/icon/beauty.svg'),
      },
      {
        id: 5,
        category: 'お小遣い',
        image: require('~/assets/images/icon/phone.svg'),
      },
    ];

    // TODO: firebaseとの繋ぎ込み時に削除
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

    const changeTab = (val: ExpenseType.Expense | ExpenseType.Income) => {
      return (expenseType.value = val);
    };

    const getSelectedOption = (id: number) => {
      if (!selectedOption.value) return;
      if (expenseType.value === 0) {
        selectedOption.value = expenseOptions.find(
          (option) => option.id === id,
        )?.id!;
      } else {
        selectedOption.value = incomeOptions.find(
          (option) => option.id === id,
        )?.id!;
      }
    };

    const save = () => {
      isActiveModal.value = true;
    };

    return {
      priceValue,
      memoValue,
      dateValue,
      incomeListItem,
      changeTab,
      expenseType,
      expenseOptions,
      incomeOptions,
      getSelectedOption,
      selectedOption,
      ExpenseType,
      expenseArray,
      save,
      add,
    };
  },
});
</script>
