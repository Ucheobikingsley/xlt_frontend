import  store from '@/store'
import ky from 'ky';
import {computed} from 'vue'
import { getModule } from 'vuex-module-decorators'
import User from '../store/store/user'





const user = getModule(User,store);
export const api = ky.create({
  prefixUrl: process.env.VUE_APP_API_URL,
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      async (request) => {
        console.log('userToken-->'+ user);
        request.headers.set('Authorization', `Bearer ${user.token}`);
      },
    ],
    // afterResponse: [
    //   async (request, options, response) => {
    //     const user = getModule(User, store);
    //     if (response.status === 401) {
    //       const resp = await response.json();
    //       if (isUauthenticatedErrorResponse(resp)) {
    //         await user.logout();
    //         await router.push({
    //           name: 'login',
    //         });
    //       }
    //     }
    //   },
    // ],
  },
  retry: {
    limit: 10,
    methods: ['get'],
    statusCodes: [413],
  },
  timeout: 10000,
});
