import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'この入力項目は必須です',
});

extend('number', (value) => {
  const regex = /^[0-9]+$/;
  if (regex.test(value)) {
    return true;
  }
  return '半角数字で入力してください';
});
