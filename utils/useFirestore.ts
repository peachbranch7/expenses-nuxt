import { doc, collection } from 'firebase/firestore';
import { db } from '@/plugins/firebase';

export const usersRef = () => {
  return doc(db, 'users');
};

export const usersCollectionRef = () => {
  return collection(db, 'users');
};

export const usersDocRef = (uid: string) => {
  return doc(db, 'users', uid);
};
