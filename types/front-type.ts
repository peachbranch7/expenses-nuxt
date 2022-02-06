import { Dayjs } from 'dayjs';

export type CardListItem = {
  id: number;
  date: Dayjs;
  category: string;
  img: string;
  price: string;
}[];

export type CategoryItems = {
  id: number;
  category: string;
  image: string;
}[];

export type FormValuesType = {
  uid: string;
  date: string;
  category: string;
  price: string;
  memo: string;
};

export type TabMenuOptionType = {
  label: string;
  link: string;
  isActive: string;
};
