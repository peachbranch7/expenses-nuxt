import { Dayjs } from 'dayjs';

export type CardListItem = {
  id: number;
  date: Dayjs;
  category: string;
  price: string;
};

export type CategoryItems = Pick<CardListItem, 'id' | 'category'> & {
  image: string;
};

export type FormValuesType = {
  uid: string;
  postType: 0 | 1;
  date: string;
  category: string;
  price: string;
  memo: string;
};

export type PostCollectionData = Omit<FormValuesType, 'date'> & {
  date: { seconds: number; nanoseconds: number };
};

export type TabMenuOptionType = {
  label: string;
  link: string;
  isActive: string;
};

export type UserType = {
  loggedIn: boolean;
  uid: string;
  name: string;
};
