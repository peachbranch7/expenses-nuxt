import { TabMenuOption } from '~/types/front-type';
import useUrls from '~/utils/useUrls';

export const tabMenuOptions: TabMenuOption[] = [
  {
    label: 'Home',
    link: useUrls.topLink,
    isActive: 'Home',
  },
  {
    label: 'Post',
    link: useUrls.topLink,
    isActive: 'Post',
  },
  {
    label: 'Report',
    link: useUrls.topLink,
    isActive: 'Report',
  },
  {
    label: 'Calendar',
    link: useUrls.topLink,
    isActive: 'Calendar',
  },
];
