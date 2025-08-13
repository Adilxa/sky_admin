import { $api } from '@/API';

export const getBranchesList = async () => {
  try {
    const res = await $api.get('/dashboard/branches/list/');
    return res.data;
  } catch (e: any) {
    throw e;
  }
};
