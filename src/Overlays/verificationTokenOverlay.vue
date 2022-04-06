<template>
   <BaseModal>
        <div ref="overlay" class="overlay entry verificationtokenoverlay">
            <div class="cancel">
                <i class="fas fa-times-circle" @click="cancel"></i>
            </div>
            
            <div class="email_logo"><i class="fas fa-envelope-open-text"></i></div>
            <div class="message">
                <h3 class="header">Verification Token</h3>
                <p class="text">Welcome, An Email Token has been sent to you, Enter the email token to continue.</p>
            </div>

            <form class="field" @submit.prevent="onSubmit">
                <input v-model="otpToken.value.value" class="token" type="text" name="otpToken"  required>
                <div v-if="otpToken.errorMessage.value" class="error">
                    {{ otpToken.errorMessage.value }}
                </div>
                <div class="field_button">
                  <button>Verify</button>
                </div>
            </form>
        </div>
   </BaseModal>
</template>
<script>
import { defineComponent,ref} from 'vue'
import BaseModal from './BaseModal.vue';
import { onClickOutside, templateRef } from '@vueuse/core';
import { useReCaptcha } from 'vue-recaptcha-v3';
 import { useField, useForm } from 'vee-validate';
 import { useToast } from 'vue-toastification';
  import { api } from '@/utils/request';
 import { string, object } from 'yup';
  import { HTTPError, TimeoutError } from 'ky';
  import {get} from 'lodash-es'
   import  store from '@/store'
 import User from '@/store/store/user'
 import { getModule } from 'vuex-module-decorators'
 import {isDevelopment,hasLoggedInResponse} from '../utils/helper';
export default defineComponent({
    components:{
        BaseModal
    },
    props:{
        isActive:{
            type: Boolean,
            required: false,
            default: false,
        }
    },
    emits:['close'],
    setup(props,{emit}){
        const toast = useToast();
        const toastId = ref('verify');
        const recaptcha = useReCaptcha();
        const isSaving = ref(false);
        const user = getModule(User, store);
        const validationSchema = object({
        otpToken: string()
            .max(5, 'Please Enter a valid token'),
        })

        const form = useForm({
            validationSchema,
            initialValues: {
                otpToken: ''
            },
        });

         const otpToken = useField('otpToken', undefined, {
           validateOnValueUpdate: true,
         });

        const onSubmit  = async(e)=>{
            e.preventDefault();
           
            const {valid} = await form.validate();
            console.log(valid);
             if(!valid){
                console.log("here-->" + valid)
                toast.error('Ooops... invalid token', {
                timeout: 7000,
                id: toastId.value,
                });
                return;
            }
             if(!isDevelopment){
                toast.error('Ooops... Cannot Submit request at this time, Please refreash the page', {
                timeout: 7000,
                id: toastId.value,
                });
            return;
            }
             isSaving.value = true;
            toast.info('Logging user...', {
                id: toastId.value,
                timeout: 7000,
            });

            try{
            const token = isDevelopment
          ? await recaptcha.executeRecaptcha('verify_token')
          : 'token';
          console.log(token)
          let response = await api.post('verify',{
            json:{
               'captcha':token,
               ...form.values
            }
          })

           if (response.status === 200) {
          const data = await response.json();
          await user.setIsAuthenticated()
          console.log("data -->" +JSON.stringify(data));
         console.log(hasLoggedInResponse(data))
          if (hasLoggedInResponse(data)) {
            emit('close');
            window.location.reload();
           return toast.success('User logged successfully', {
              id: toastId.value,
              timeout: 3500,
            });
          }
          return  toast.error('An Error Occurerd', {
          timeout: 7000,
          id: toastId.value,
        });

        } else {
          toast.error('Please refresh this page...', {
            id: toastId.value,
            timeout: 4000,
          });
        }
            }catch(e){
               console.log(form)
               console.log(otpToken)
                console.error(e);
          if (!e) window.location.reload();
          (async () => {
            if (e instanceof HTTPError) {
              const status = parseInt(get(e, 'response.status'), 10);
              if (status === 400) {
                isSaving.value = false;
                const errResp = await e.response.json();
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
            toast.error(
              'An error occurred while verifying token',
              {
                id: toastId.value,
                timeout: 4000,
              },
            );
          })();
            }
        }
        const closeOverlay = ()=>{
            emit('close');
        }
        const cancel = ()=>{
            emit('close');
        }
        onClickOutside(templateRef('overlay'), closeOverlay);
        return{
            cancel,
            onSubmit,
            form,
            otpToken,
        }
    }
})
</script>

<style lang="scss">
@use '@/assets/scss/colors.scss' as color;
@use 'sass:color' as sasscolor;
@use '@/assets/scss/_breakpoint.scss' as breakpoint;
.overlay.entry.verificationtokenoverlay{
  background: color.$white-1;
  height: 400px;
  width: 60%;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .cancel{
    position: absolute;
    right: 7%;
    top: 7%;

    .fas{
      cursor: pointer;
    }
  }
  .email_logo{
      display: flex;
         align-items: center;
         justify-content: center;
         padding: 20px;
         border-radius: 50px;
         background: color.$greenColor;
      .fas{
          font-size:30px;
        

      }
  }
  .message{

    .header{
        text-align: center;
        font-size: 26px;
    }
    .text{
        color: color.$ash-1;
    }
  }

  .field{
      .token{
          border-style: none;
          border-bottom: 1px solid color.$black-2;
          outline: none;
          letter-spacing: 3px;
      }

      .error{
          color:color.$red-faint;
          font-size: 12px;
      }

    .field_button{
        margin-top: 10px;
        button{
            padding: 16px 65px;
            background: color.$greenColor;
            color: color.$white-1;
           border-style: none;
            font-size: 16px;
            letter-spacing: 2px;
            border-radius: 6px;
            cursor: pointer;
        }
    }
      
  }
}

</style>