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
  date: string;
  category: string;
  price: string;
  memo: string;
};

export type TabMenuOption = {
  label: String;
  link: String;
  isActive: String;
};
