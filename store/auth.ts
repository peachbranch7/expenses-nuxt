import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
} from 'firebase/auth';
import { setDoc, getDoc } from 'firebase/firestore';
import { usersDocRef } from '~/utils/useFirestore';
import { UserType } from '~/types/front-type';

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class Auth extends VuexModule {
  private user: UserType = {
    loggedIn: false,
    uid: '',
    name: '',
  };

  get getUserUid() {
    return this.user.uid;
  }

  get getUserName() {
    return this.user.name;
  }

  get getUserLoggedIn() {
    return this.user.loggedIn;
  }

  @Mutation
  public setLoginStatus(loggedIn: boolean) {
    this.user.loggedIn = loggedIn;
  }

  @Mutation
  public setUserUid(uid: string) {
    this.user.uid = uid;
  }

  @Mutation
  public setUserName(name: string) {
    this.user.name = name;
  }

  @Action
  public async login() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // const credential: any = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        const user = result.user;
        const userRef = await getDoc(usersDocRef(user.uid));

        if (!userRef.exists()) {
          await setDoc(usersDocRef(user.uid), {
            uid: user.uid,
            name: user.displayName,
          });
        }

        // this.setUserData(user);
        this.setLoginStatus(true);
        this.setUserUid(user.uid);
        this.setUserName(user.displayName!);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // const credential = GoogleAuthProvider.credentialFromError(error);

        console.error('login error: ', errorCode, errorMessage);
      });

    await setPersistence(auth, browserSessionPersistence)
      .then((user: any) => {
        this.setLoginStatus(true);
        this.setUserUid(user.uid);
        this.setUserName(user.displayName!);
        console.log('keeping user');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('keeping user error: ', errorCode, errorMessage);
      });
  }

  @Action
  public async loginGuest() {
    const auth = getAuth();

    await signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        this.setUserUid(user.uid);
        this.setUserName(user.displayName!);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error('guest login error: ', errorCode, errorMessage);
      });

    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log('guest keeping user');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('guest keeping user error: ', errorCode, errorMessage);
      });
  }

  @Action
  public logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.setLoginStatus(false);
        this.setUserName('');
        this.setUserUid('');
      })
      .catch((error) => {
        console.error('logout error', error);
      });
  }

  @Action
  public onAuth() {
    const auth = getAuth();
    // TODO: ???????????????
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user = user || {};
        this.setUserUid(user.uid);
        this.setUserName(user.displayName!);
        this.setLoginStatus(!!user.uid);
      }
    });
  }
}
