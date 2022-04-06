<template class="viewport">
  <div class="container">
  <div v-if="!doesntNeedFrame" class="main_content">
    <VerificationOverlay v-if ="!isActive && isActiveToken"/>
    <component :is="AppFrame">
      <Suspense>
        <template #default>
          <router-view/>
        </template>
        <template #fallback>
          <spinner class="loader"></spinner>
        </template>
      </Suspense>
    </component>
  </div>
   <div v-else class="app entry unframed">
    <suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <Loader id="#framed-loader" />
      </template>
    </suspense>
  </div>
  </div>
</template>
<script>
import { defineComponent, onErrorCaptured,onBeforeMount,ref,computed,defineAsyncComponent } from 'vue'
import { getModule } from 'vuex-module-decorators'
import  store from '@/store'
 import User from '@/store/store/user'
 import {useRouter, useRoute} from 'vue-router'
 import VerificationOverlay from '@/Overlays/verificationTokenOverlay.vue'
 import spinner from '@/assets/gif/spinner.svg?component'


const AppFrame = defineAsyncComponent({
    loader:()=> import(
      /*webpackMode: "lazy" */
      /*webpackPrefetch: true */
      '@/components/Frames/Default.vue'
    )
  })
export default defineComponent({
  components:{
    VerificationOverlay,
    spinner
  },
  setup() {
    const user = getModule(User, store);
    const router = useRouter();
    const route = useRoute();
    const activeSideBar = ref(false);
    onErrorCaptured((err, component, info)=>{
      console.log(err),
      console.log(info),
      console.log(component)
    })
    onBeforeMount(()=>{
        user.syncToken();
        user.syncIsAuthenticated();
    })

  
  console.log(route.name)

  const authPages = ['Home', 'Post',];
  const doesntNeedFrame = computed(() => {
      if (route && route.name && typeof route.name === 'string') {
        return authPages.includes(route.name);
      }

      return false;
    });
   
    const isActive = computed(()=>{
      return user.isAuthenticated === true;
    })

    const isActiveToken = computed (()=>{
      return user.token === true;
    })

  
    
    router.beforeEach((to,from,next)=>{
    if(to.name !== 'Home' && !user.token){
      next({name: 'Home'})
    }else{
      next();
     }
    })

    
    
    return{
      activeSideBar,
      isActive,
      isActiveToken,
      AppFrame,
      doesntNeedFrame
    }
  },
})
</script>

<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
body,
#app,.viewport {
  font-family: 'Open Sans', sans-serif;
  padding: 0;
  margin: 0;
  display: flex;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  .loader{
    font-size: 40px;  
  }
  
  .container{
    width: 100%;
    height: 100%;
    .main_content{
      display: flex;
      .left_side{
        width: 30%;
      }

      .right_side{
        width: 70%;
        background: color.$white-2;
      }
      .notActive{
         width: 100%;
      }
    }
  }
}



</style>
