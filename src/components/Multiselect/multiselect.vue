<template>
  <div class="components multiselect multiselect">
    <Multiselect
      ref="select"
      class="multi-select"
      :searchable="true"
      :options="options"
      :mode="mode"
      :caret="true"
      value-prop="value"
      label="label"
      :resolve-on-load="false"
      :loading="isLoading"
      track-by="value"
      max-height="100"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
import { defineComponent, onMounted, watch } from 'vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import { getInitialRecordListData } from '@/utils/helper';
export default defineComponent({
  components: {
    Multiselect,
  },
  props: {
    options: {
      type: Array,
      required: false,
      default: () => getInitialRecordListData,
    },
    mode: {
      type: String,
      required: false,
      default: 'single',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    watch(
      () => props.isLoading,
      (value) => {
        if (value) {
          console.log(value);
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );
    return {
      getInitialRecordListData,
    };
  },
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/colors.scss' as color;
@use 'sass:color' as sasscolor;
@use '@/assets/scss/_breakpoint.scss' as breakpoint;
.components.multiselect.multiselect {
  border-style: none;
  .multi-select {
    border: 1px solid color.$greenColor;
    border-radius: 6px;
    width: 100%;
    text-decoration: none;
  }
}
</style>
