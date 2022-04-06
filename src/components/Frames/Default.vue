<template>
  <div class="pages entry dashboard">
    <HeaderNav />
    <div class="body_section">
      <div v-if="activeSideBar" class="side_content">
        <div class="content_">
          <p class="content_p">SETTINGS<i class="fas fa-cog"></i></p>
        </div>

        <div class="img_div">
          <!-- <img src="../assets/images/jpegs/new.jpeg" alt="" /> -->
        </div>
        <div class="advice">
          <p>Advice</p>
          <div class="learn_advice">
            <ul>
              <li>Learn how to create an effective ad</li>
            </ul>
          </div>
        </div>

        <div class="menu">
          <div
            :class="{
              active:
                activeTab === 'Ads' || selectedActiveTab === 'Ads',
            }"
            class="menu_list"
            @click="sendToMyAccount"
          >
            <i class="fas fa-bars"></i>
            <p>My Ads</p>
          </div>
          <div
            :class="{ active: activeTab === 'Feedback' }"
            class="menu_list"
            @click="sendToMyFeedBack"
          >
            <i class="fas fa-comments"></i>
            <p>FeedBacks</p>
          </div>

          <div class="menu_list">
            <i class="fas fa-bell"></i>
            <p>Notifications</p>
          </div>
          <div class="menu_list">
            <i class="fas fa-bell"></i>
            <p>Wishlist</p>
          </div>
        </div>
      </div>
      <div :class="{ fullScreen: !activeSideBar }" class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import HeaderNav from '@/components/Header/HeaderNav.vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  components: {
    HeaderNav,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedActiveTab = ref('');

    router.afterEach((to) => {
      console.log('here-->' + to.name);
      if (to.name == 'Ads') {
        console.log('here-->' + to.name);
        activeTab.value = 'ads';
      }
    });

    const activeSideBar = computed(() => {
      return route.meta.needSideBar === true;
    });
    console.log(router);
    const activeTab = computed(() => {
      return route.name;
    });

    const sendToMyAccount = () => {
      console.log('here');
      selectedActiveTab.value = 'Ads';
      return router.push({ name: 'Ads' });
    };

    const sendToMyFeedBack = () => {
      console.log('here');
      selectedActiveTab.value = 'Feedback';
      return router.push({ name: 'Feedback' });
    };
    return {
      sendToMyFeedBack,
      sendToMyAccount,
      activeTab,
      selectedActiveTab,
      activeSideBar,
    };
  },
});
</script>
<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.pages.entry.dashboard {
  background: color.$white-2;
  width: 100%;
  height: 100vh;
  .body_section {
    padding-left: 3%;
    display: flex;
    justify-content: space-between;
    .side_content {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 23%;
      height: auto;
      background: color.$white-1;
      border-radius: 6px;
      .content_ {
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
        .content_p {
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          .fas {
            margin-left: 6px;
          }
        }
      }

      .img_div {
        height: 100px;
        width: 100px;
        border-radius: 50px;
        overflow: hidden;
        margin-top: 50px;
        margin: 0 auto;

        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
      .advice {
        width: 100%;
        background: color.$red-faint;
        color: color.$white-1;
        height: auto;
        font-weight: 590;
        margin-top: 30px;
        padding: 10px 0px 10px 0px;

        > * {
          margin-left: 10px;
        }

        .learn_advice {
          background: color.$white-1;
          color: color.$red-faint;
          border-radius: 4px;
          padding: 1px;
          font-weight: 600;
          cursor: pointer;
          width: 92%;
        }
      }

      .menu {
        padding: 8px 0px 8px 0px;
        .active {
          background-color: color.$greenColor;
          color: color.$white-1;
          > .fas {
            color: color.$white-1;
          }
        }
        .menu_list {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-top: 4px;
          padding-left: 12px;
          width: 90%;
          margin: 0 auto;
          border-radius: 6px;
          transition: 0.3s ease-in-out;

          &:hover {
            background-color: color.$greenColor;
            > .fas {
              color: color.$white-1;
            }
          }
          > * {
            &:is(:first-child) {
              margin-right: 12px;
            }
          }
        }
      }
    }
    .content {
      width: 73%;
      height: 100%;

      &.fullScreen {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
