<template>
  <BaseModal>
    <div ref="loginoverlay" class="component entry signupoverlay">
      <div class="cancel">
        <i class="fas fa-times-circle" @click="cancel"></i>
      </div>
      <form @submit.prevent="onSubmit" @change="handleChange">
        <h3 class="title">Login</h3>
        <div v-if="isLoading" class="spinner">
          <spinner></spinner>
        </div>
        <div class="group">
          <label for="name">Email Address</label>
          <span
            class="input-icon"
            :class="{ 'has-error': email.errorMessage.value }"
          >
            <input
              id="email"
              v-model="email.value.value"
              type="email"
              name="email"
              placeholder=""
            />
          </span>
          <div v-if="email.errorMessage.value" class="error">
            {{ email.errorMessage.value }}
          </div>
        </div>

        <div class="group">
          <label for="name">Password</label>
          <span
            class="input-icon"
            :class="{ 'has-error': password.errorMessage.value }"
          >
            <input
              id="password"
              v-model="password.value.value"
              type="text"
              name="password"
              placeholder=""
            />
          </span>
          <div v-if="password.errorMessage.value" class="error">
            {{ name.errorMessage.value }}
          </div>
        </div>
        <button
          class="submitBtn"
          type="submit"
          :disabled="!isFormValid"
        >
          Sign In
        </button>
      </form>
    </div>
  </BaseModal>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import BaseModal from './BaseModal.vue';
import { useField, useForm } from 'vee-validate';
import { string, object } from 'yup';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useToast } from 'vue-toastification';
import store from '@/store';
import User from '@/store/store/user';
import { getModule } from 'vuex-module-decorators';
import spinner from '@/assets/gif/spinner.svg?component';
import { HTTPError, TimeoutError } from 'ky';
import { get } from 'lodash-es';
import { api } from '@/utils/request';
import { isDevelopment, hasLoggedInResponse } from '../utils/helper';

//  import { each, get, isArray, isEmpty } from 'lodash-es';
// import { HTTPError, TimeoutError } from 'ky';
import { onClickOutside, templateRef } from '@vueuse/core';
export default defineComponent({
  components: {
    BaseModal,
    spinner,
  },
  emits: ['close', 'activeVerify'],
  setup(props, { emit }) {
    const isSaving = ref(false);
    const isLoading = ref(false);
    const recaptcha = useReCaptcha();

    const toast = useToast();
    const user = getModule(User, store);
    const toastId = ref('register');
    const validationSchema = object({
      email: string()
        .email('Please input a valid email address')
        .required('Please input a valid email address'),
      password: string().min(6, 'cannot be less than 6 characters'),
    });

    const form = useForm({
      validationSchema,
      initialValues: {
        email: '',
        password: '',
      },
    });

    const email = useField('email', undefined, {
      validateOnValueUpdate: false,
    });
    const password = useField('password', undefined, {
      validateOnValueUpdate: false,
    });
    const closeOverlay = () => {
      emit('close');
    };
    const isFormValid = computed(() => {
      return (
        email.meta.dirty &&
        password.meta.dirty &&
        form.meta.value.valid
      );
    });
    const cancel = () => {
      emit('close');
    };

    onClickOutside(templateRef('loginoverlay'), closeOverlay);
    const onSubmit = async (e) => {
      e.preventDefault();
      isLoading.value = true;
      console.log('here');
      const { valid } = await form.validate();
      console.log(valid);
      if (!valid) {
        console.log('here-->' + valid);
        toast.error('Ooops... invalid login credentials', {
          timeout: 7000,
          id: toastId.value,
        });

        return;
      }
      console.log(import.meta.env.MODE);
      console.log(isDevelopment);
      if (!isDevelopment) {
        toast.error(
          'Ooops... Cannot Submit request at this time, Please refreash the page',
          {
            timeout: 7000,
            id: toastId.value,
          },
        );

        return;
      }

      isSaving.value = true;
      toast.info('Logging user...', {
        id: toastId.value,
        timeout: 4000,
      });

      try {
        const token = isDevelopment
          ? await recaptcha.executeRecaptcha('login')
          : 'token';

        let response = await api.post('login', {
          json: {
            ...form.values,
            captcha: token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          isLoading.value = false;
          console.log('data -->' + JSON.stringify(data));
          console.log(hasLoggedInResponse(data));
          if (hasLoggedInResponse(data)) {
            user.setToken(data.data);
            emit('close');
            return toast.success('User logged successfully', {
              id: toastId.value,
              timeout: 3500,
            });
          }
          return toast.error('An Error Occurerd', {
            timeout: 7000,
            id: toastId.value,
          });
        } else {
          toast.error('Please refresh this page...', {
            id: toastId.value,
            timeout: 4000,
          });
        }
      } catch (e) {
        isLoading.value = false;
        if (!e) window.location.reload();

        (async () => {
          if (e instanceof HTTPError) {
            const status = parseInt(get(e, 'response.status'), 10);
            if (status === 400) {
              isSaving.value = false;
              const errResp = await e.response.json();
              console.log(errResp);
              return toast.error(errResp.message, {
                id: toastId.value,
                timeout: 4000,
              });
            }
          } else if (e instanceof TimeoutError) {
            return toast.error(
              'Ooops.. An error occured while sending request.. PLease check your internet connection',
              {
                id: toastId.value,
                timeout: 7000,
              },
            );
          }
          toast.error('An error occurred while verifying token', {
            id: toastId.value,
            timeout: 4000,
          });
        })();
      }
    };

    return {
      onSubmit,
      email,
      isFormValid,
      cancel,
      password,
    };
  },
});
</script>
<style lang="scss">
@use '@/assets/scss/colors.scss' as color;
@use 'sass:color' as sasscolor;
@use '@/assets/scss/_breakpoint.scss' as breakpoint;
.component.entry.signupoverlay {
  display: flex;
  width: 40%;
  max-width: 700px;
  height: auto;
  background-color: color.$white-1;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow: hidden;
  border-radius: 8px;
  margin: 50px 0 0 0;
  position: relative;

  @include breakpoint.respond-below(md) {
    width: 80%;
  }

  @include breakpoint.respond-below(sm) {
    width: 90%;
  }

  .cancel {
    position: absolute;
    right: 7%;
    top: 7%;

    .fas {
      cursor: pointer;
    }
  }
  > form,
  > .success {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    align-items: center;

    > * {
      display: flex;
      width: 100%;
      margin: 20px 0 0 0;
    }

    > .icon {
      width: 70px;
      height: 70px;
    }

    > .title {
      text-align: center;
      font-size: 33px;
      font-weight: bolder;
      text-transform: initial;
      justify-content: center;
      margin: 40px 0 10px 0;
    }

    .spinner {
      width: 100px;
      height: 100px;
      margin-top: 0 !important;
    }

    > .group {
      width: 80%;
      flex-direction: column;

      @include breakpoint.respond-below(md) {
        width: 90%;
      }

      > * {
        display: flex;
        width: 100%;
        justify-content: flex-start;
      }

      > label {
        margin: 0;
        font-weight: normal;
        text-transform: capitalize;
        font-size: 17px;
      }

      > .input-icon {
        border: none;
        position: relative;
        align-items: center;
        margin: 6px 0 0 0;

        > input {
          width: 100%;
          height: 50px;
          padding: 0 0 0 30px;
          font-size: 13px;
          color: color.$ash-1;
          border: 1px solid rgba(color.$greenColor, 0.8);
          background-color: color.$white-1;
          border-radius: 7px;
          transition: all 0.3s ease-in-out;
          outline: initial;

          &[name='token'] {
            &:placeholder-shown {
              color: color.$ash-1;
              text-transform: capitalize;
              font-size: 14px;
            }

            &:not(:placeholder-shown) {
              color: color.$black-2;
              text-transform: uppercase;
              font-size: 16px;
              letter-spacing: 6px;
              font-weight: bold;
              font-family: 'LatoBold', Tahoma, Geneva, Verdana,
                sans-serif;
            }
          }

          &:focus {
            box-shadow: 1px 1px 5px 0 rgba(color.$ash-1, 0.4);
          }
        }

        > .icon {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 30px;
          color: color.$ash-1;
          transition: all 0.3s ease-in-out;
        }

        &.has-error {
          > input {
            border-color: color.$red-faint;
          }

          > .icon {
            color: color.$red-faint;
          }
        }
      }

      > .error {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
        color: color.$red-faint;
        margin: 8px 0 0 0;
        flex-wrap: wrap;
        text-transform: capitalize;
      }
    }

    > .submitBtn {
      width: 40%;
      margin: 40px 0 30px 0;
      justify-content: center;
      align-items: center;
      background-color: color.$greenColor;
      color: color.$white-1;
      border-radius: 10px;
      font-size: 20px;
      text-transform: capitalize;
      padding: 12px 20px;
      outline: initial;
      border: initial;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      @include breakpoint.respond-below(md) {
        width: 70%;
      }

      &:hover:not(:disabled) {
        box-shadow: 1px 1px 5px 0 color.$ash-1;
      }

      &:disabled {
        background-color: color.$ash-1;
        cursor: not-allowed;
      }
    }
  }

  > .success {
    > .icon {
      color: color.$greenColor;
    }

    > .info {
      width: 80%;
      font-size: 23px;
      font-style: italic;
      justify-content: center;
      line-height: 30px;
      flex-wrap: wrap;

      @include breakpoint.respond-below(md) {
        width: 90%;
      }

      > p {
        width: 100%;
        text-align: center;
        display: inline;
        flex-wrap: nowrap;
        margin-bottom: 0;

        > a {
          color: color.$greenColor;
        }
      }
    }

    > .welcome {
      width: 70%;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
      color: color.$greenColor;
      font-size: 20px;
      margin: 50px 0;

      @include breakpoint.respond-below(md) {
        width: 85%;
      }
    }
  }

  > .close {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 1;
    width: 18px;
    height: 18px;
    color: color.$greenColor;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
