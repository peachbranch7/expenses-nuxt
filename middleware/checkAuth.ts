import { Context } from '@nuxt/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authStore } from '@/store';

export default function ({ redirect, route }: Context) {
  const auth = getAuth();
  // TODO: any警察
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      user = user || {};
      authStore.setUserUid(user.uid);
      authStore.setUserName(user.displayName!);
      authStore.setLoginStatus(!!user.uid);
    } else if (!user && !authStore.getUserLoggedIn && route.name !== 'login') {
      redirect('/login');
    }
  });
}
