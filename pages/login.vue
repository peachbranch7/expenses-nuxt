<template>
  <section class="login-container">
    <div class="container">
      <h2 class="title">ログイン画面</h2>
      <AppButton @click="login()">ログイン</AppButton>
      <AppButton @click="logout()">ログアウト</AppButton>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api';
import { authStore } from '@/store';
import AppButton from '~/components/atoms/AppButton.vue';
import useUrls from '~/utils/useUrls';

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login();
        router.push(useUrls.topLink);
      } catch (error) {
        console.error(error);
      }
    };

    const logout = async () => {
      try {
        await authStore.logout();
        router.push(useUrls.topLink);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      login,
      logout,
    };
  },
});
</script>
