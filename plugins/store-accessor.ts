/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import FormValues from '~/store/formValues';

let formValuesStore: FormValues;
function initialiseStores(store: Store<any>): void {
  formValuesStore = getModule(FormValues, store);
}

export { initialiseStores, formValuesStore };
