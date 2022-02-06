/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import FormValues from '~/store/formValues';
import Auth from '~/store/auth';

let formValuesStore: FormValues;
let authStore: Auth;

function initializeStores(store: Store<any>): void {
  formValuesStore = getModule(FormValues, store);
  authStore = getModule(Auth, store);
}

export { initializeStores, formValuesStore, authStore };
