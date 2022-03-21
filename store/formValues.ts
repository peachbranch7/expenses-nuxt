import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { FormValuesType, PostDoc } from '~/types/front-type';

@Module({
  name: 'formValues',
  stateFactory: true,
  namespaced: true,
})
export default class FormValues extends VuexModule {
  private formValues: FormValuesType = {
    uid: '',
    postType: 0,
    date: '',
    category: '',
    price: '',
    memo: '',
  };

  private PostDoc: PostDoc[] = [];

  get getFormValues() {
    return this.formValues;
  }

  get getPostDoc() {
    return this.PostDoc;
  }

  @Mutation
  private setFormValues(data: FormValuesType) {
    return (this.formValues = data);
  }

  @Mutation
  private setPostDoc(docs: PostDoc[]) {
    this.PostDoc = [...docs];
  }

  @Mutation
  private initFormValues() {
    this.formValues.uid = '';
    this.formValues.postType = 0;
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

  @Action
  public addPostCollectionData(docs: PostDoc[]) {
    return this.setPostDoc(docs);
  }
}
