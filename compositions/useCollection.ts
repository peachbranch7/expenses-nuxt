import { ref } from '@nuxtjs/composition-api';
import { addDoc } from 'firebase/firestore';
import { FormValuesType } from '~/types/front-type';

/**
 *  HACK: 今のところCollectionの型はFormValuesのみ
 *  Converterに定義する
 *  */
const useCollection = (collection: any) => {
  // NOTE:collectionはいろいろあるので複数のエラーが考えられる。そのため毎回errorを作成できるように関数内で宣言する
  const error = ref<string | null>(null);

  const add = async (doc: FormValuesType) => {
    error.value = null;
    try {
      await addDoc(collection, doc);
    } catch (err) {
      console.error(err);
      error.value = 'could not send the message';
    }
  };
  return { add, error };
};

export default useCollection;
