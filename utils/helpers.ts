import dayjs from 'dayjs';
import { CategoryType } from '~/utils/enum';

/**
 * selectedOptionをcategory名に変換する処理
 */

export const getCategoryName = (selectedOption: number): string => {
  switch (selectedOption) {
    case 1:
      return '食費';
    case 2:
      return '衣類';
    case 3:
      return '日用品';
    case 4:
      return '美容代';
    case 5:
      return '通信費';
    case 6:
      return '交際費';
    default:
      return '';
  }
};

/**
 *  categoryに応じて画像を出し分ける処理
 */
export const getCategoryImage = (category: string): string => {
  switch (category) {
    case CategoryType.Meal:
      return require('~/assets/images/icon/meal.svg');
    case CategoryType.Clothing:
      return require('~/assets/images/icon/clothing.svg');
    case CategoryType.DiaryItem:
      return require('~/assets/images/icon/daily-expense.svg');
    case CategoryType.Beauty:
      return require('~/assets/images/icon/beauty.svg');
    case CategoryType.Phone:
      return require('~/assets/images/icon/phone.svg');
    case CategoryType.Social:
      return require('~/assets/images/icon/social-expense.svg');
    default:
      return '';
  }
};

/**
 *  timestamp型のdateのformatを変換する処理
 */

export const convertDateFormat = (date: any): string => {
  return dayjs(date.toDate()).format(`YYYY年M月DD日`);
};
