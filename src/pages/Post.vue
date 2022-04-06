<template>
    <div class="page entry post">
      <Post/>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import Post from '@/components/Post/post.vue'
export default defineComponent({
    components:{
        Post
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    .page.entry.post{
        width: 100%;
        height: 100vh;
    }
</style>
