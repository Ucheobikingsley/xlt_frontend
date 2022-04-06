<template>
  <div class="pages entry feedback">
    <div class="main_">
      <div class="header">
        <div class="header_container">
          <p class="title">Feedback</p>
        </div>
        <div class="nav_container">
          <button :disabled="true" class="nav">
            Received<span>(0)</span>
          </button>
          <button :disabled="true" class="nav">
            Sent<span>(0)</span>
          </button>
        </div>
      </div>
      <div class="main_content">
        <div class="empty_feedback">
          <i class="fas fa-comment-alt"></i>
          <span>There are currently no feedback available</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss">
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;

.pages.entry.feedback {
  width: 100%;
  background: color.$white-2;

  .main_ {
    width: 96%;
    min-height: 400px;
    background: color.$white-1;
    border-radius: 6px;
    margin-top: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    position: relative;

    .header {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid rgba(color.$grey-shade, 0.2);

      .header_container {
        width: 70%;
        padding-left: 30px;
        .title {
          font-size: 20px;
          font-weight: 900;
        }
      }
      .nav_container {
        display: flex;
        width: 24%;

        .nav {
          padding: 16px 8px;
          background: color.$greenColor;
          margin-left: 20px;
          border-radius: 6px;
          color: color.$white-1;
          border-style: none;

          &:is(button[disabled]) {
            background: sasscolor.adjust(
              $color: color.$greenColor,
              $alpha: -0.5
            );
          }
        }
      }
    }
    .main_content {
      width: 100%;
      height: 100%;

      .empty_feedback {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        text-align: center;
        transform: translate(-50%, -50%);
        .fas {
          font-size: 87px;
          color: color.$ash-1;
        }
      }
    }
  }
}
</style>
