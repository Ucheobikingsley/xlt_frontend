<template>
  <div class="components entry headerheadernav">
    <div class="header">
      <div class="logo">
        <img
          src="@/assets/images/pngs/logos.png"
          alt=""
          @click="sendToIndex"
        />
      </div>
      <LoginModal
        v-if="activeRegistrationModal"
        @close="closeLogin"
      />
      <SignupOverlay
        v-if="activeModal"
        @close="close"
        @active-verify="activeVerify = $event"
      />
      <VerificationTokenOverlay
        v-if="activeVerify"
        @close="closeVerifyModal"
      />
      <div class="search">
        <input placeholder="search" name="search" type="text" />
        <i class="fas fa-search"></i>
      </div>
      <div v-if="checkToken" class="header-right">
        <p><i title="Liked" class="far fa-heart"></i> Liked</p>
        <p id="cartegories" @mouseover="toggleWithAnimationOptions">
          <i title="My Account" class="fas fa-user-alt"></i>Welcome,
          Uche
        </p>

        <DxPopover
          v-model:visible="withShadingOptionsVisible"
          :width="150"
          target="#cartegories"
          position="bottom"
          container=".dx-viewport"
        >
          <div class="view" @click="sendToMyAccount">My Account</div>
          <div class="delete" @click="deleteUsers">FeedBack</div>
          <div class="delete" @click="deleteUsers">Settings</div>
          <div class="delete" @click="logout">Logout</div>
        </DxPopover>
      </div>
      <div v-else class="header-right">
        <p @click="registrationModal">Sign in</p>
        <div class="line"></div>
        <p @click="activeSignUpModal">Register</p>
      </div>
      <div class="btn">
        <button @click="sendToPostAds">POST ADS</button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import SignupOverlay from '../../Overlays/SignupOverlay.vue';
import VerificationTokenOverlay from '../../Overlays/verificationTokenOverlay.vue';
import LoginModal from '../../Overlays/LoginModal.vue';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import User from '@/store/store/user';
import { useRouter } from 'vue-router';
import { DxPopover } from 'devextreme-vue/popover';

export default defineComponent({
  components: {
    SignupOverlay,
    DxPopover,
    VerificationTokenOverlay,
    LoginModal,
  },
  props: {
    activeVerifyModal: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeModal = ref(false);
    const activeRegistrationModal = ref(false);
    const user = getModule(User, store);
    const activeVerify = ref(null);
    const router = useRouter();
    const withShadingOptionsVisible = ref(false);
    const activeSignUpModal = () => {
      if (activeModal.value == false) {
        return (activeModal.value = true);
        //    emit('activateModal');
      }
      return (activeModal.value = false);
    };
    const registrationModal = () => {
      return (activeRegistrationModal.value = true);
    };
    const closeLogin = () => {
      return (activeRegistrationModal.value = false);
    };
    const close = () => {
      if (activeModal.value == true) {
        return (activeModal.value = false);
      }
      return;
    };

    const closeVerifyModal = () => {
      return activeVerify.value
        ? !activeVerify.value
        : activeVerify.value;
    };
    const checkToken = computed(() => {
      if (user.token) {
        return true;
      }
      return false;
    });
    const toggleWithAnimationOptions = () => {
      withShadingOptionsVisible.value =
        !withShadingOptionsVisible.value;
    };

    const logout = () => {
      user.unsyncToken();
      router.push({ name: 'Home' });
    };

    const sendToMyAccount = () => {
      router.push({ name: 'Ads' });
    };

    const sendToIndex = () => {
      router.push({ name: 'Home' });
    };

    const sendToPostAds = () => {
      router.push({ name: 'Post' });
    };

    return {
      sendToPostAds,
      sendToIndex,
      closeLogin,
      sendToMyAccount,
      checkToken,
      logout,
      activeSignUpModal,
      activeModal,
      close,
      withShadingOptionsVisible,
      toggleWithAnimationOptions,
      activeVerify,
      closeVerifyModal,
      registrationModal,
      activeRegistrationModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.components.entry.headerheadernav {
  background: color.$greenColor;
  width: 100%;
  color: color.$white-1;
  top: 0;
  position: sticky;
  margin-bottom: 30px;
  z-index: 10;

  .dx-popup-content div {
    margin-bottom: 15px;
  }
  .dx-popup-content {
    height: 100px;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    .logo {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        cursor: pointer;
      }
    }
    .search {
      width: 30%;
      height: 30px;
      border-radius: 6px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: initial;
        border-radius: 6px;
        padding-left: 10px;

        &:focus {
          outline: none;
        }
      }
      .fas {
        position: absolute;
        left: 96%;
        top: 27%;
        color: color.$greenColor;
      }
    }

    .header-right {
      width: 28%;
      display: flex;
      align-items: center;
      justify-content: center;

      > * {
        font-size: 20px;
        margin-right: 30px;
        cursor: pointer;
      }
      .line {
        border: 1px solid color.$white-1;
        height: 40px;
      }
    }
    .btn {
      button {
        padding: 16px 32px;
        border: initial;
        color: color.$white-1;
        border-radius: 6px;
        background: color.$red-faint;
        cursor: pointer;

        &:hover {
          box-shadow: 1px 1px 5px 0px color.$ash-1;
        }
      }
    }
  }
}
</style>
