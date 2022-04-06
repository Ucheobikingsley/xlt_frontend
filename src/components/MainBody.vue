<template>
  <div class="components entry mainbody">
    <div class="main_">
      <div v-if="category" class="cartegories">
        <div class="header">Cartegories</div>
        <div
          v-for="(categories, index) in category.data"
          :key="index"
          class="list"
        >
          <img :src="categories.product_image" alt="img" />
          <p>{{ categories.product_name }}</p>
        </div>
      </div>
      <div class="product">
        <h2>Post Ads</h2>
        <div class="line"></div>
        <div class="product_list">
          <!-- <button @click="showSingle">Show single picture.</button>
                    <button @click="showMultiple">Show a group of pictures.</button> -->
          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div class="list">
            <img src="../assets/images/jpegs/crops.jpeg" alt="img" />

            <div class="container">
              <div class="seed_rating">
                <h4>Seeds</h4>
                <h3>NGN20000</h3>
                <div class="sold">
                  <span class="small">98 sold</span>
                  <span class="vl"></span>
                  <span><i class="fas fa-star"></i></span>
                  <span class="small">4.9</span>
                </div>
              </div>
            </div>
          </div>
          <!-- all props & events -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { asyncComputed } from '@vueuse/core';
import axios from 'axios';

export default defineComponent({
  components: {},
  setup() {
    const imgs = ref('');
    const visible = ref(false);
    const index = ref(0);
    const rating = ref(0);
    const categoriesData = asyncComputed(async () => {
      const data = await axios.get(
        'http://localhost:4000/xlt/v1/categories',
      );
      return data.data;
    });
    const isLiked = ref(false);
    const activeLike = () => {
      if (isLiked.value == true) {
        console.log('value is -->' + isLiked.value);
        return (isLiked.value = false);
      }
      return (isLiked.value = true);
    };

    return {
      category: categoriesData,
      imgs,
      index,
      visible,
      rating,
      activeLike,
      isLiked,
    };
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150';
      // or
      this.imgs = {
        title: 'this is a placeholder',
        src: 'http://via.placeholder.com/350x150',
      };
      this.show();
    },
    showMultiple() {
      this.imgs = [
        'http://via.placeholder.com/350x150',
        'http://via.placeholder.com/350x150',
      ];
      // or
      this.imgs = [
        {
          title: 'test img',
          src: 'http://via.placeholder.com/350x150',
        },
        'http://via.placeholder.com/350x150',
      ];
      // allow mixing

      this.index = 1; // index of imgList
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
});
</script>
<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.components.entry.mainbody {
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 20px;
  .main_ {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .cartegories {
      width: 20%;
      padding: 10px 30px;
      background: color.$white-1;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

      .header {
        font-weight: 600;
      }
      .list {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 50px;
        }
      }
    }
    .product {
      width: 70%;
      padding: 0 2%;
      .product_list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 2% 0 2%;
        .list {
          width: 23%;
          border-radius: 6px;
          overflow: hidden;
          margin: 0 0 20px 0;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

          img {
            width: 100%;
            height: 100%;
          }
          .container {
            padding-left: 15px;
            padding-bottom: 10px;
            display: flex;
            align-items: center;

            .seed_rating {
              width: 80%;
              h4 {
                padding: 0;
                margin: 0;
              }

              h3 {
                padding: 0;
                margin: 0;
                font-size: 22px;
                font-weight: bold;
              }
              .sold {
                display: flex;
                align-items: center;
                .small {
                  font-size: 13px;
                }

                .fas {
                  color: color.$greenColor;
                  margin-right: 4px;
                }
                .vl {
                  border-left: 1px solid color.$ash-1;
                  height: 14.75px;
                  margin-left: 10px;
                  margin-right: 10px;
                }
              }
              .ratings {
                margin: 0 0 0 -115px;
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
