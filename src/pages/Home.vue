<template>
  <div class="page entry home">
    <HeaderNav />
    <Slidder />
    <MainBody />
    <div class="features">
      <div class="section">
        <div class="header">
          <span><i class="fas fa-video"></i></span>
          <h3>Videos</h3>
        </div>
        <div class="about_features">
          Gain access to our video tutorials on correct export
          processes to meet international standards
        </div>
      </div>
      <div class="section">
        <div class="header">
          <span><i class="fas fa-comment"></i></span>
          <h3>Live Chat</h3>
        </div>
        <div class="about_features">
          Experience live chat sessions with our expert professionals
          & practitioners in the industry while also interacting with
          other users on the platform.
        </div>
      </div>
      <div class="section">
        <div class="header">
          <span><i class="fas fa-headphones"></i></span>
          <h3>24/7 support</h3>
        </div>
        <div class="about_features">
          Gain access to our video tutorials on correct export
          processes to meet international standards
        </div>
      </div>
    </div>

    <div class="solution_package">
      <div class="header">Solution Package</div>
      <div
        v-if="(activePackage === 'exporter') | 'all'"
        class="solution"
      >
        <div class="prompt">
          <h4 class="question">Are you an Exporter?</h4>
          <span class="register"
            >Register and get every feature for free</span
          >
          <button class="register_btn">Register Now</button>
        </div>
        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Export Search Engine</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">HS Codes</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Shipping Companies Schedules</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Background Checks</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Commodity Prices</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Exclusive Consulting Services</span
            >
          </div>
        </div>

        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Commodities Quality control</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Commodities Quality control</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Export Financial Facilities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >24/7 access to support team on any issue</span
            >
          </div>
          <div class="sub_heading">We also get you conneted to</div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Local Buying Agents</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Freight Forwarders</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">International Buyers</span>
          </div>
        </div>
        <div v-if="activePackage !== 'all'" class="action_button">
          <button @click="activateAllPackages">
            See more of our package
          </button>
        </div>
      </div>

      <div v-if="activePackage === 'all'" class="solution">
        <div class="prompt">
          <h4 class="question">Are you an International Buyer?</h4>
          <span class="register"
            >Register and get every feature for free</span
          >
          <button class="register_btn">Register Now</button>
        </div>
        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Export Search Engine</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >HS Codes For import & Export Commodities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Shipping Companies Schedules</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Background Checks</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Commodity Prices</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Exclusive Consulting Services (Import duties & export
              commodities)</span
            >
          </div>
        </div>

        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Commodities Quality control</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Professionals and Experienced Practitioners</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Export Financial Facilities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >24/7 access to support team on any issue</span
            >
          </div>
          <div class="sub_heading">Requirements</div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">A registered company</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Proof of registration (scanned copy) as this will be
              uploaded in registration process</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Company Details</span>
          </div>
        </div>
      </div>

      <div v-if="activePackage === 'all'" class="solution">
        <div class="prompt">
          <h4 class="question">Are you an Local Buying Agent ?</h4>
          <span class="register"
            >Register and get every feature for free</span
          >
          <button class="register_btn">Register Now</button>
        </div>
        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Export Search Engine</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >HS Codes For import & Export Commodities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Shipping Companies Schedules</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Background Checks</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Commodity Prices</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Exclusive Consulting Services (Import duties & export
              commodities)</span
            >
          </div>
        </div>

        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Commodities Quality control</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Professionals and Experienced Practitioners</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Export Financial Facilities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >24/7 access to support team on any issue</span
            >
          </div>
          <div class="sub_heading">Requirements</div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">A registered company</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Proof of registration (scanned copy) as this will be
              uploaded in registration process</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Company Details</span>
          </div>
        </div>
      </div>

      <div v-if="activePackage === 'all'" class="solution">
        <div class="prompt">
          <h4 class="question">Are you a Freight Forwarder?</h4>
          <span class="register"
            >Register and get every feature for free</span
          >
          <button class="register_btn">Register Now</button>
        </div>
        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Export Search Engine</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >HS Codes For import & Export Commodities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Shipping Companies Schedules</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Background Checks</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Commodity Prices</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Exclusive Consulting Services (Import duties & export
              commodities)</span
            >
          </div>
        </div>

        <div class="features_1">
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Commodities Quality control</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Professionals and Experienced Practitioners</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Export Financial Facilities</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >24/7 access to support team on any issue</span
            >
          </div>
          <div class="sub_heading">Requirements</div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">A registered company</span>
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name"
              >Proof of registration (scanned copy) as this will be
              uploaded in registration process</span
            >
          </div>
          <div class="wrapper">
            <span class="check"
              ><i class="fas fa-check-circle"></i
            ></span>
            <span class="feature_name">Company Details</span>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

import Slidder from '@/components/Slidder.vue';
import Footer from '../components/Footer.vue';
import MainBody from '../components/MainBody.vue';
import HeaderNav from '@/components/Header/HeaderNav.vue';
export default defineComponent({
  components: {
    Slidder,
    Footer,
    MainBody,
    HeaderNav,
  },
  setup() {
    const activePackage = ref('exporter');

    const activateAllPackages = () => {
      activePackage.value = 'all';
    };
    return {
      activePackage,
      activateAllPackages,
    };
  },
});
</script>
<style lang="scss">
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.page.entry.home {
  width: 100%;
  height: 100%;
  background: color.$white-2;
  max-height: calc(100% - 30px);
  overflow-y: auto;

  > .features {
    width: 100%;
    display: flex;
    min-height: 400px;
    align-items: center;
    justify-content: space-around;
    // padding: 0px 50px 0px 50px;
    margin-top: 50px;
    margin-bottom: 50px;
    flex-wrap: wrap;
    background-image: url('@/assets/images/jpegs/exportImage.jpg');
    position: relative;
    background-attachment: fixed;
    background-size: cover;
    z-index: 1;

    &::before {
      content: '';
      display: block;
      background: rgba(0, 0, 0, 0.5);
      left: 0;
      top: 0;
      position: absolute;
      height: 100%;
      width: 100vw;
    }

    > .section {
      width: 20%;
      position: relative;

      > .header {
        display: flex;
        align-items: center;
        color: color.$white-1;
        span {
          padding: 10px;
          border-radius: 50px;
          border: 1px solid color.$greenColor;
          cursor: pointer;

          .fas {
            color: color.$white-1;
          }
        }
        h3 {
          font-size: 22px;
          font-weight: bold;
          margin-left: 30px;
        }
      }

      > .about_features {
        font-size: 15px;
        color: color.$white-1;
        font-weight: 500;
      }
    }
  }

  .solution_package {
    width: 90%;
    margin: 0 auto;
    border-radius: 6px;

    > .header {
      text-align: center;
      font-size: 35px;
      line-height: 48px;
      font-weight: 600;
      margin-bottom: 26px;
    }
    > .solution {
      display: flex;
      position: relative;
      height: auto;
      height: auto;
      margin-bottom: 20px;
      background: color.$white-1;
      padding: 40px 30px 70px 30px;

      & > .prompt {
        display: flex;
        flex-direction: column;
        width: 30%;
        margin-right: 10%;

        > h4 {
          font-weight: 500;
          font-size: 36px;
          line-height: 40px;
          padding: 0;
          margin: 0;
        }

        > .register {
          font-weight: 500;
          font-size: 20px;
          line-height: 40px;
          margin: 25px 0 60px 0;
        }

        > .register_btn {
          cursor: pointer;
          background-color: color.$greenColor;
          color: color.$white-1;
          border-radius: 6px;
          font-weight: 600;
          // width: 100%;
          padding: 15px 40px;
          outline: none;
          border-style: none;
        }
      }

      & > .features_1 {
        width: 30%;

        > .sub_heading {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 30px;
        }
        > .wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          > .check {
            margin-right: 18px;
          }
          > .feature_name {
            font-size: 16px;
            line-height: 19px;
            letter-spacing: 1.2px;
          }
        }
      }

      & > .action_button {
        position: absolute;
        right: 4%;
        bottom: 5%;
        button {
          border-style: none;
          outline: none;
          background: color.$greenColor;
          border-radius: 6px;
          color: color.$white-1;
          white-space: nowrap;
          padding: 10px 16px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          font-size: 16px;

          &:hover {
            background: sasscolor.adjust(
              color.$greenColor,
              $lightness: -30%,
              $alpha: -0.4
            );
          }
        }
      }
    }
  }
}
</style>
