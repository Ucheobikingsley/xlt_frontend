import { Module, VuexModule,Mutation, Action, Action } from 'vuex-module-decorators'
import { nextTick } from 'vue';

@Module({ namespaced:true,  name: 'User' })
export default class User extends VuexModule {
  token = "";
  isAuthenticated = false;

  @Mutation
  updateToken(n: string) {
    this.token = n 
    localStorage.setItem("token", this.token)
  }

  @Mutation
  syncToken(n: string) {
    if(localStorage.getItem("token")){
      return this.token = localStorage.getItem("token")
    }
    return;
  }

  @Mutation
  unsyncToken(n: string) {
    if(localStorage.getItem("token")){
      return this.token = localStorage.setItem("token", "")
    }
    return;
  }
  @Mutation
  syncIsAuthenticated(){
    if(localStorage.getItem("isAuthenticated")){
     return this.isAuthenticated = localStorage.getItem("isAuthenticated")
    }
    this.isAuthenticated = false;
  }
  @Mutation
  updateIsAuthenticated() {
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", this.isAuthenticated)
    }

  @Action
  async setIsAuthenticated(){
    this.context.commit('updateIsAuthenticated')
    await nextTick();
  }

  

  @Action
  async setToken(token: string) {
    this.context.commit('updateToken',token)
    await nextTick();
  }

 

}
