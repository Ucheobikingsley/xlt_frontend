import { asyncComputed } from '@vueuse/core';
import { api } from '@/utils/request';
export const isDevelopment = import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';
import { get, isObject, isArray, isString } from 'lodash-es';
import { array } from 'yup';
import { nextTick } from 'vue';

export const hasLoggedInResponse = (payload) => {
  return (
    isObject(payload) &&
    (get(payload, 'success') == 'success' || true)
  );
};
export const getInitialRecordListData = () => {
  return [
    {
      value: 'uche',
      label: 'uche',
    },
  ];
};
export const getRecordListData = async (url, param = null) => {
  if (isString(url) && !isString(param)) {
    const newList = [];
    asyncComputed(async () => {
      const data = await api.get(url);
      const dataResponse = await data.json();
      if (hasLoggedInResponse(data)) {
        const arrayList = dataResponse.data;
        await arrayList.map((list) => {
          const dataObject = {
            value:
              list.product_name ?? list.country ?? list.name.common,
            label:
              list.product_name ?? list.country ?? list.name.common,
          };
          newList.push(dataObject);
        });
        console.log(newList);
      }
    });

    return newList;
  } else if (isString(url) && isString(param)) {
    const newList = [];
    asyncComputed(async () => {
      const data = await api.get(url);
      const dataResponse = await data.json();
      if (hasLoggedInResponse(data)) {
        const arrayList = dataResponse.data;
        arrayList.map((list) => {
          const dataObject = {
            value:
              list.product_name ?? list.country ?? list.cities.name,
            label:
              list.product_name ?? list.country ?? list.cities.name,
          };
          newList.push(dataObject);
        });
        console.log(newList);
      }
    });
  } else {
    return;
  }
};
