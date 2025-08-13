import { $api } from '@/API';

export const getBranchesList = async () => {
  try {
    const res = await $api.get('dashboard/branches/list/');
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
};


export const getServiceList = async () => {
  try {
    const res = await $api.get('dashboard/extra-services/services/');
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
}
