import { TabMenuOptionType } from '~/types/front-type';
import useUrls from '~/utils/useUrls';

export const tabMenuOptions: TabMenuOptionType[] = [
  {
    label: 'Home',
    link: useUrls.topLink,
    isActive: 'Home',
  },
  {
    label: 'Report',
    link: useUrls.topLink,
    isActive: 'Report',
  },
  {
    label: 'Calendar',
    link: useUrls.calendarLink,
    isActive: 'Calendar',
  },
];
