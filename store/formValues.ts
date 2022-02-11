import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { FormValuesType } from '~/types/front-type';

@Module({
  name: 'formValues',
  stateFactory: true,
  namespaced: true,
})
export default class FormValues extends VuexModule {
  private formValues: FormValuesType = {
    uid: '',
    date: '',
    category: '',
    price: '',
    memo: '',
  };

  get getFormValues() {
    return this.formValues;
  }

  @Mutation
  private setFormValues(data: FormValuesType) {
    return (this.formValues = data);
  }

  @Mutation
  private initFormValues() {
    this.formValues.category = '';
    this.formValues.date = '';
    this.formValues.price = '';
    this.formValues.memo = '';
  }

  @Action
  public dispatchFormValues(data: FormValuesType) {
    return this.setFormValues(data);
  }

  @Action
  public dispatchInitFormValues() {
    return this.initFormValues();
  }
}
