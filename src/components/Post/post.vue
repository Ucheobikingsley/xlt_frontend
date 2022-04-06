<template>
  <div class="components entry postpost">
    <HeaderNav />
    <div class="overhead">
      <h2 class="title">Post Ads</h2>

      <div class="info">
        <div class="active">
          <span>Phase 1:</span> Product Overview
        </div>
        <div class=""><span>Phase 2:</span> Product Details</div>
      </div>
      <div v-show="false" class="body">
        <form
          class="form"
          @submit.prevent="onSubmit"
          @change="handleChange"
        >
          <div class="group">
            <DxSelectBox
              v-model:selected-item="cartegorySelection.value.value"
              display-expr="value"
              :data-source="categories"
            >
              <template #loadIcon="{}">
                <div>
                  <DxLoadIndicator :visible="isLoading" />
                  <span :hidden="!isLoading"> </span>
                </div>
              </template>
            </DxSelectBox>
            <div
              v-if="cartegorySelection.errorMessage.value"
              class="error"
            >
              {{ cartegorySelection.errorMessage.value }}
            </div>
          </div>
          <div class="location">
            <div class="group small">
              <DxSelectBox
                v-model:selected-item="countrySelection.value.value"
                :search-enabled="true"
                display-expr="value"
                :data-source="country"
                :search-mode="searchModeOption"
                :search-expr="searchExprOption"
                :search-timeout="searchTimeoutOption"
              >
                <template #loadIcon="{}">
                  <div>
                    <DxLoadIndicator :visible="isLoading" />
                    <span :hidden="!isLoading"> </span>
                  </div>
                </template>
              </DxSelectBox>
              <div
                v-if="countrySelection.errorMessage.value"
                class="error"
              >
                {{ countrySelection.errorMessage.value }}
              </div>
            </div>
            <div class="group small">
              <input
                v-model="stateSelection.value.value"
                class="input-text"
                placeholder="State..."
              />

              <div
                v-if="stateSelection.errorMessage.value"
                class="error"
              >
                {{ stateSelection.errorMessage.value }}
              </div>
            </div>
          </div>
          <div class="add-photo">
            <h3 class="title">Add Photo</h3>
            <p class="subtitle">
              Add a minimum of 1 photo for the category chosen
            </p>
            <div class="add-box"><i class="fas fa-plus"></i></div>
          </div>
        </form>
      </div>
      <div class="supplementaryForm">
        <div class="group small">
          <input
            v-model="stateSelection.value.value"
            class="input-text"
            placeholder="Title"
          />

          <div v-if="stateSelection.errorMessage.value" class="error">
            {{ stateSelection.errorMessage.value }}
          </div>
        </div>

        <div class="group small">
          <input
            v-model="stateSelection.value.value"
            class="input-text"
            placeholder="State..."
          />

          <div v-if="stateSelection.errorMessage.value" class="error">
            {{ stateSelection.errorMessage.value }}
          </div>
        </div>

        <div class="group wider">
          <input
            v-model="stateSelection.value.value"
            class="input-text"
            placeholder="State..."
          />

          <div v-if="stateSelection.errorMessage.value" class="error">
            {{ stateSelection.errorMessage.value }}
          </div>
        </div>

        <div class="group small price">
          <input
            v-model="stateSelection.value.value"
            class="input-text"
            placeholder="State..."
          />

          <div v-if="stateSelection.errorMessage.value" class="error">
            {{ stateSelection.errorMessage.value }}
          </div>
        </div>
      </div>
      <button class="submit">Next</button>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  computed,
  // defineAsyncComponent,
} from 'vue';
import { useField, useForm } from 'vee-validate';
import { string, object } from 'yup';
import { asyncComputed } from '@vueuse/core';
import HeaderNav from '@/components/Header/HeaderNav.vue';
import { DxLoadIndicator } from 'devextreme-vue/load-indicator';
import { DxSelectBox } from 'devextreme-vue/select-box';
import {
  getRecordListData,
  getInitialRecordListData,
} from '@/utils/helper.js';
import { createChangeHandler } from '@/utils/validator.ts';
// const DxFileUploader = defineAsyncComponent({
//   loader: async () =>
//     import(
//       /* webpackChunkName: "file-uploader" */
//       /* webpackMode: "lazy" */
//       /* webpackPrefetch: true */
//       'devextreme-vue/ui/file-uploader'
//     ),
// });
export default defineComponent({
  components: {
    DxLoadIndicator,
    DxSelectBox,
    HeaderNav,
    // DxFileUploader,
  },
  setup() {
    const isLoading = ref(false);
    const allState = ref([]);
    const update = ref(Date.now());
    const searchModeOption = ref('contains');
    const searchExprOption = ref('value');
    const searchTimeoutOption = ref(200);
    const validationSchema = object({
      cartegorySelection: string().test({
        name: 'check-category-selection',
        exclusive: true,
        params: {},
        message: 'Please select a valid category',
        test: function (value) {
          return value ? categories.value.includes(value) : false;
        },
      }),

      countrySelection: string().test({
        name: 'check-country-selection',
        exclusive: true,
        params: {},
        message: 'Please select a valid country',
        test: function (value) {
          return value ? country.value.includes(value) : false;
        },
      }),

      stateSelection: string().min('1', 'Value must be more than 1 '),
    });

    const form = useForm({
      validationSchema,
      initialValues: {
        cartegorySelection: '',
        countrySelection: '',
        stateSelection: '',
      },
    });

    const cartegorySelection = useField(
      'cartegorySelection',
      undefined,
      {
        validateOnValueUpdate: true,
      },
    );
    const countrySelection = useField('countrySelection', undefined, {
      validateOnValueUpdate: true,
    });

    const stateSelection = useField('stateSelection', undefined, {
      validateOnValueUpdate: true,
    });

    const categories = asyncComputed(async () => {
      return await getRecordListData('categories');
    }, getInitialRecordListData());
    const commonCategories = async () => {
      return await getRecordListData('categories');
    };

    const country = asyncComputed(async () => {
      return await getRecordListData('country');
    }, getInitialRecordListData());

    // const allCategories = computed(() => {
    //   return Date.now() && categories.value;
    // });

    // const allCountry = computed(() => {
    //   return Date.now() && country.value;
    // });
    const isFormValid = computed(() => {
      return form.validate();
    });
    const onSubmit = () => {};

    const handleChange = createChangeHandler(form);

    return {
      onSubmit,
      isFormValid,
      handleChange,
      update,
      country,
      categories,
      allCategories: computed(() => categories.value),
      allCountry: computed(() => country.value),
      alllCategories: computed(() => commonCategories),
      allState,
      searchModeOption,
      searchExprOption,
      searchTimeoutOption,
      isLoading,
      cartegorySelection,
      countrySelection,
      stateSelection,
    };
  },
});
</script>
<style scoped lang="scss">
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.components.entry.postpost {
  width: 100%;
  height: 100%;
  background: color.$white-2 !important;

  @mixin input-style {
    width: 100%;
    height: 100%;
    padding: 10px 0 20px 5px;
    cursor: pointer;
    border-radius: 4px;
    border-style: none;
    border: 1px solid color.$greenColor;
    outline: none;
  }

  .overhead {
    min-height: 550px;
    width: 60%;
    background: color.$white-1 !important;
    margin: 0 auto;
    padding: 15px 40px 10px 40px;
    border-radius: 8px;
    position: relative;

    > .title {
      margin: 0 auto;
      width: 180px;
      font-size: 35px;
    }
    .info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      .active {
        background: color.$greenColor;
      }
      > * {
        margin-right: 10px;
        width: 30%;
        padding: 20px;
        background: color.$ash-1;
        text-align: center;
        font-size: 20px;
        color: color.$white-1;
        border-radius: 8px;
        font-weight: 700;
      }
    }
    .body {
      width: 100%;
      text-align: center;
      margin-top: 40px;
      position: relative;

      > .form {
        margin: 0 auto;
        width: 70%;

        > * {
          margin-bottom: 30px;
        }

        .error {
          color: color.$red-faint;
          font-size: 12px;
        }

        & .group {
          :deep() {
            .dx-editor-outlined {
              border-color: color.$greenColor !important;
            }
          }
        }

        .location {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .small {
            width: 48%;

            .input-text {
              width: 100%;
              border-radius: 4px;
              border-color: color.$greenColor;
              border-style: none;
              border: 1px solid color.$greenColor;
              padding: 10px 0 10px 5px;
              font-size: 14px;
              outline: none;
            }
          }
        }
      }
      .title {
        margin: 0;
      }
      .subtitle {
        margin: 7px 0 0 0;
      }

      .add-box {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background: color.$ash-1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .fas {
          font-size: 40px;
          color: color.$white-1;
        }
      }
    }

    .supplementaryForm {
      margin: 30px 0 20px 0;
      > .group {
        width: 100%;
        min-height: 48px;
        margin-bottom: 14px;

        &.small {
          width: 48%;
        }
        &.wider {
          height: 200px;
        }

        input {
          @include input-style;
        }
      }
    }

    .submit {
      width: 250px;
      text-align: center;
      padding: 13px 38px;
      background: color.$greenColor;
      position: absolute;
      border-style: none;
      color: color.$white-1;
      font-weight: bold;
      border-radius: 6px;
      top: 87%;
      cursor: pointer;
      left: 42%;
    }
  }
}
</style>
