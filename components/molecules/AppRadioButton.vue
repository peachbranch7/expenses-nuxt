<template>
  <section class="app-radiobutton">
    <h2 class="title">{{ label }}</h2>
    <div class="container">
      <label
        v-for="option in options"
        :key="option.id + option.category"
        class="radiobutton"
        :class="{
          '-checked': option.id === selectedOption,
        }"
        :for="option.id"
      >
        <input
          :id="option.id"
          :key="option.id + option.category"
          class="option"
          type="radio"
          name="inputName"
          value="option.category"
          @change="
            $emit('change', getCategoryName(option.id, postType), option.id)
          "
        />
        <img :src="getCategoryImage(option.category)" class="icon" />
        <p class="label">
          {{ option.category }}
        </p>
      </label>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { CategoryItems } from '~/types/front-type';
import { getCategoryImage, getCategoryName } from '~/utils/helpers';

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<CategoryItems[]>,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    selectedOption: {
      type: Number,
      default: 1,
    },
    isIncome: {
      type: Boolean,
      default: false,
    },
    postType: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {
      getCategoryImage,
      getCategoryName,
    };
  },
});
</script>
