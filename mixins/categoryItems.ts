import { CategoryItems } from '~/types/front-type';

export const expenseOptions: CategoryItems[] = [
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

export const incomeOptions: CategoryItems[] = [
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
