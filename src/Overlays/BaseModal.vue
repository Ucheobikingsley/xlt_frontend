<template>
  <teleport to='#overlay' >
    <div class="component entry overlaybase">
        <slot></slot>
    </div>
  </teleport>
</template>
<script lang="ts">
</script>
<style lang="scss">
@use '@/assets/scss/colors.scss' as color;
@use 'sass:color' as sasscolor;

.component.entry.overlaybase{
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: rgba(0,0,0,.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 3;
}

</style>