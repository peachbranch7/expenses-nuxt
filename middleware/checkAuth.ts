import { Context } from '@nuxt/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { db } from '@/plugins/firebase';
import { authStore } from '@/store';

// const allowUnauthorizedPages = ['login'];

// TODO: 未ログインユーザーはログイン画面に遷移するよう修正する
export default function ({ redirect }: Context) {
  return new Promise<void>((resolve) => {
    const auth = getAuth();
    // TODO: any警察
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        user = user || {};
        authStore.setUserUid(user.uid);
        authStore.setUserName(user.displayName!);
        authStore.setLoginStatus(!!user.uid);
        // redirect('/');
      } else {
        // redirect('/login');
        console.log('失敗');
      }
      resolve();
    });
  });
}
